import React from "react";

const Introduce = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-2/3 w-full">
          <h5 className="text-2xl font-bold mb-4">Giới thiệu về BeeCinemas</h5>
          <p className="text-gray-700 mb-4">
            F5 Bee Media được thành lập bởi doanh nhân F5 Bee Cinemas (F5 Bee
            Beta) vào cuối năm 2014 với sứ mệnh "Mang trải nghiệm điện ảnh với
            mức giá hợp lý cho mọi người dân Việt Nam".
          </p>
          <p className="text-gray-700 mb-4">
            Với thiết kế độc đáo, trẻ trung, F5 BeeCinemas mang đến trải nghiệm
            điện ảnh chất lượng với chi phí đầu tư và vận hành tối ưu - nhờ việc
            chọn địa điểm phù hợp, tận dụng tối đa diện tích, bố trí khoa học,
            nhằm duy trì giá vé xem phim trung bình chỉ từ 40,000/1 vé - phù hợp
            với đại đa số người dân Việt Nam.
          </p>
          <p className="text-gray-700 mb-4">
            Năm 2023 đánh dấu cột mốc vàng son cho BeeCinemas khi ghi nhận mức
            tăng trưởng doanh thu ấn tượng 150% so với năm 2019 - là năm đỉnh
            cao của ngành rạp chiếu phim trước khi đại dịch Covid-19 diễn ra.
            Thành tích này cho thấy sức sống mãnh liệt và khả năng phục hồi ấn
            tượng của chuỗi rạp.
          </p>
          <p className="text-gray-700 mb-4">
            Tính đến thời điểm hiện tại, BeeCinemas đang có 20 cụm rạp trải dài
            khắp cả nước, phục vụ tới 6 triệu khách hàng mỗi năm, là doanh
            nghiệp dẫn đầu phân khúc đại chúng của thị trường điện ảnh Việt. Bee
            Media cũng hoạt động tích cực trong lĩnh vực sản xuất và phát hành
            phim.
          </p>
          <p className="text-gray-700 mb-4">
            Ngoài đa số các cụm rạp do Poly Media tự đầu tư, ¼ số cụm rạp của
            Poly Media còn được phát triển bằng hình thức nhượng quyền linh
            hoạt. Chi phí đầu tư rạp chiếu phim BeeCinemas được tối ưu giúp nhà
            đầu tư dễ dàng tiếp cận và nhanh chóng hoàn vốn, mang lại hiệu quả
            kinh doanh cao và đảm bảo.
          </p>
          <h6 className="text-xl font-semibold mt-6">Thông tin liên hệ</h6>
          <p className="text-gray-700">
            <strong>Email:</strong> beecinemas@bee.cenimas.vn
          </p>
          <p className="text-gray-700">
            <strong>Số điện thoại:</strong> 0999999999
          </p>
          <p className="text-gray-700">
            <strong>Giờ làm việc:</strong> 7:00 - 22:00
          </p>
        </div>

        <div className="md:w-1/3 w-full flex justify-center  self-start mt-12">
          <img
            src="https://stcd02265632633.cloud.edgevnpay.vn/website-vnpay-public/fill/2023/11/0afpil4f5e9b1700211713083.jpg"
            alt="BeeCinemas"
            className="w-1/3 md:w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Introduce;
