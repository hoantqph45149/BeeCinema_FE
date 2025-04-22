import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { formatVND } from "./../../../utils/Currency";
import Combo from "./Combo";
import Discount from "./Discount";
import InforMovie from "./InforMovie";
import PaymentMethod from "./PaymentMethod";
import TotalPriceSeat from "./TotalPriceSeat";
import api from "../../../apis/axios";
import Loading from "./../../../Components/Common/Loading";
import isDayOff from "../../../utils/CheckDay";
import { showAlert } from "../../../Components/Common/showAlert";

const Checkout = () => {
  const { authUser } = useAuthContext();
  const { slug } = useParams();
  const { data, isLoadingCheckout } = useFetch(
    ["checkout", slug],
    `/userHoldSeats/${slug}`
  );
  const { data: membership, isLoading: isLoadingMembership } = useFetch(
    ["membership"],
    "/user/membership",
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
    }
  );
  const { data: dataPoints, isLoading: isLoadingPoints } = useFetch(
    ["points"],
    "/points/available"
  );

  const { create: checkout } = useCRUD(["payment"]);

  const { create: chooseSeat } = useCRUD(["chooseSeats"]);
  const location = useLocation();
  const [showtime, setShowtime] = useState({});
  const [combos, setcombos] = useState([]);
  const [selectVoucher, setSelectVoucher] = useState(null);
  const [time, setTime] = useState(null);
  const [point, setPoint] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [priceDiscountVoucher, setPriceDiscountVoucher] = useState(0);
  const [priceDiscountPoint, setPriceDiscountPoint] = useState(0);
  const [priceDiscountCombo, setPriceDiscountCombo] = useState(0);
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [priceSeats, setPriceSeats] = useState(0);
  const [priceCombos, setPriceCombos] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalpayment, setTotalPayment] = useState(0);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const now = dayjs();
  const selectedSeatsRef = useRef(data?.holdSeats);

  useEffect(() => {
    const handlePageLeave = () => {
      if (selectedSeatsRef.current.length > 0) {
        selectedSeatsRef.current.forEach((seat) => {
          chooseSeat.mutate({
            url: "/update-seat",
            data: {
              seat_id: seat.seat_id,
              showtime_id: seat?.showtime_id,
              action: "release",
            },
            shouldShowLoadingAlert: false,
            shouldShowAlert: false,
          });
        });
      }
    };

    return () => {
      const newPath = window.location.pathname;

      if (newPath !== `/choose-seat/${slug}`) {
        handlePageLeave();
      }
    };
  }, [location.pathname]);

  useEffect(() => {
    if (data) {
      setShowtime(data?.showtime);
      selectedSeatsRef.current = data?.holdSeats;
      const closestItem = data.holdSeats
        .map((item) => ({
          ...item,
          original_hold_expires_at: item.hold_expires_at,
          hold_expires_at: dayjs(item.hold_expires_at).diff(
            now,
            "milliseconds"
          ),
        }))
        .filter((item) => item.hold_expires_at > 0)
        .reduce(
          (min, item) =>
            item.hold_expires_at < min.hold_expires_at ? item : min,
          {
            hold_expires_at: Infinity,
            original_hold_expires_at: null,
          }
        );
      setTime(closestItem.original_hold_expires_at);
    }
  }, [data]);

  const handleCalculateTotalPriceSeat = (data) => {
    const { seatRegular, seatVip, seatDouble } = data;
    const totalPriceSeat =
      seatRegular.totalPrice + seatVip.totalPrice + seatDouble.totalPrice;
    const totalPrice =
      membership?.rank?.ticket_percentage > 0 && isDayOff()
        ? Math.max(
            totalPriceSeat -
              totalPriceSeat * (membership.rank.ticket_percentage / 100),
            0
          )
        : totalPriceSeat;
    setPriceDiscount((prev) =>
      membership?.rank?.ticket_percentage > 0 && isDayOff()
        ? totalPriceSeat * (membership.rank.ticket_percentage / 100)
        : 0
    );
    setPriceSeats(totalPriceSeat);
    setTotalAmount(totalPriceSeat);
    setTotalPayment(totalPrice);
  };

  const handleCalculatePoint = (point, isUsingPoint) => {
    if (typeof point !== "number") return;

    if (!isUsingPoint) {
      // đổi điểm
      setPoint(point);
      setPriceDiscountPoint(point);
      setPriceDiscount((prev) => prev + point);
      setTotalPayment((prev) => prev - point);
    } else {
      // hủy điểm
      setPoint(0);
      setPriceDiscountPoint(0);
      setPriceDiscount((prev) => prev - point);
      setTotalPayment((prev) => prev + point);
    }
  };

  const handleCalculatePriceCombo = (price, isAdding) => {
    const discountAmount =
      membership?.rank?.combo_percentage && isDayOff()
        ? price * (membership.rank.combo_percentage / 100)
        : 0;

    const newPriceDiscount = isAdding
      ? priceDiscount + discountAmount
      : Math.max(priceDiscount - discountAmount, 0);

    const newTotalAmount = isAdding
      ? totalAmount + price
      : Math.max(totalAmount - price, 0);

    const newTotalPayment = Math.max(newTotalAmount - newPriceDiscount, 0);

    // Tổng tiền giảm giá từ combo (cộng dồn)
    const newPriceDiscountCombo = isAdding
      ? priceDiscountCombo + discountAmount
      : Math.max(priceDiscountCombo - discountAmount, 0);

    // Tổng tiền của combo
    const newTotalComboAmount = isAdding
      ? priceCombos + price
      : Math.max(priceCombos - price, 0);
    setPriceDiscount(newPriceDiscount);
    setTotalAmount(newTotalAmount);
    setTotalPayment(newTotalPayment);
    setPriceDiscountCombo(newPriceDiscountCombo);
    setPriceCombos(newTotalComboAmount);
  };

  const handleCheckout = async () => {
    setLoadingCheckout(true);
    const combo = combos.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
    const dataPost = {
      showtime_id: showtime.id,
      seat_id: selectedSeatsRef.current.map((seat) => seat.seat_id),
      combo,
      combo_discount: priceDiscountCombo,
      payment_name: paymentMethod,
      voucher_id: selectVoucher?.id,
      voucher_code: selectVoucher?.code,
      voucher_discount: priceDiscountVoucher,
      points: point,
      point_discount: priceDiscountPoint,
      price_combo: priceCombos,
      price_seat: priceSeats,
      total_price_before_discount: totalAmount,
      total_discount: priceDiscount,
      total_price: totalpayment,
      rank_at_booking: membership.rank.name,
    };
    checkout.mutate(
      { url: "/payment", data: dataPost },
      {
        onSuccess: (data) => {
          if (data?.payment_url) {
            window.location.href = data?.payment_url;
          }
        },
        onError: (err) => {
          showAlert("Lỗi", err.response.data.message, "warning");
        },
      }
    );
  };

  return isLoadingCheckout ||
    isLoadingMembership ||
    loadingCheckout ||
    isLoadingPoints ? (
    <div className="h-screen">
      <Loading />
    </div>
  ) : (
    <>
      <div className="container grid grid-cols-1 md:grid-cols-6 gap-8 my-10 text-secondary">
        <div className="col-span-6 lg:col-span-4 divide-y-2">
          <div className="pb-4">
            <h2 className="text-sm md:text-lg font-semibold flex items-center gap-2 pb-4">
              <span>
                <img
                  className="w-6 h-6 md:w-10 md:h-10"
                  src="/images/user.png"
                  alt="user"
                />
              </span>{" "}
              THÔNG TIN THANH TOÁN
            </h2>
            <div className="flex flex-col gap-4 md:flex-row md:items-center lg:gap-10 xl:gap-28 justify-start">
              <p className="text-xs md:text-base">
                <strong className="text-sm md:text-base">Họ Tên:</strong> <br />{" "}
                {authUser?.name}
              </p>
              <p className="text-xs md:text-base">
                <strong className="text-sm">Số điện thoại:</strong> <br />{" "}
                {authUser?.phone}
              </p>
              <p className="text-xs md:text-base">
                <strong className="text-sm md:text-base">Email:</strong> <br />{" "}
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 py-4">
            <TotalPriceSeat
              holdSeats={data?.holdSeats}
              onSeatPrices={handleCalculateTotalPriceSeat}
            />
          </div>

          <div className="py-4">
            <Combo
              handleCalculatePriceCombo={handleCalculatePriceCombo}
              chooseCombos={setcombos}
            />
          </div>

          <div className="py-4">
            <Discount
              handleCalculatePoint={handleCalculatePoint}
              setSelectVoucher={setSelectVoucher}
              setPriceDiscountVoucher={setPriceDiscountVoucher}
              membership={membership}
              totalAmount={totalpayment}
              setPriceDiscount={setPriceDiscount}
              setTotalPayment={setTotalPayment}
              slug={slug}
              dataPoint={dataPoints?.available_points}
            />
          </div>
          <div className="py-4">
            <div className="flex flex-col items-end gap-4">
              <div className="flex items-center gap-2 text-sm md:text-base">
                <h4>Tổng Tiền: </h4>
                <h2 className="lg:text-xl font-semibold ">
                  {formatVND(totalAmount)}
                </h2>
              </div>

              <div className="flex items-center gap-2 text-sm md:text-base">
                <h4>Số Tiền Được Giảm: </h4>
                <h2 className="lg:text-xl font-semibold ">
                  {formatVND(priceDiscount)}
                </h2>
              </div>

              <div className="flex items-center gap-2 text-sm md:text-base">
                <h4>Số Tiền Cần Thanh Toán: </h4>
                <h2 className="lg:text-xl font-semibold">
                  {formatVND(totalpayment)}
                </h2>
              </div>
            </div>
          </div>
          <div className="py-4 flex flex-col gap-4">
            <PaymentMethod paymentMethod={setPaymentMethod} />
          </div>
        </div>
        <div className="col-span-6 lg:col-span-2">
          <InforMovie
            holdSeats={data?.holdSeats}
            showtime={showtime}
            time={time}
            slug={slug}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </>
  );
};

export default Checkout;
