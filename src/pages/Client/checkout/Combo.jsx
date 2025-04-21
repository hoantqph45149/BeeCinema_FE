import React, { useEffect, useState } from "react";
import { useFetch } from "../../../Hooks/useCRUD";

const Combo = ({ handleCalculatePriceCombo, chooseCombos }) => {
  const { data: combos } = useFetch(["combosActive"], "/combosActive");
  const [selectedCombos, setSelectedCombos] = useState([]);

  useEffect(() => {
    chooseCombos(selectedCombos);
  }, [selectedCombos]);

  const handleIncrease = (id, price) => {
    setSelectedCombos((prev) => {
      const updatedCombos = prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.totalPrice + price,
            }
          : item
      );

      const exists = prev.find((item) => item.id === id);
      if (!exists) {
        const newItem = combos?.data.find((combo) => combo.id === id);
        updatedCombos.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      return updatedCombos;
    });
    handleCalculatePriceCombo(Number(price), true);
  };

  const handleDecrease = (id, price) => {
    setSelectedCombos((prev) => {
      const updatedCombos = prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: item.totalPrice - price,
              }
            : item
        )
        .filter((item) => item.quantity > 0);

      return updatedCombos;
    });
    handleCalculatePriceCombo(Number(price), false);
  };

  return (
    <div>
      <h2 className="text-sm md:text-lg font-semibold flex items-center gap-2">
        <img
          className="w-6 h-7 md:w-10 md:h-12"
          src="/images/combo.png"
          alt="img_combo"
        />
        COMBO ƯU ĐÃI
      </h2>
      <div className="flex flex-col gap-4 mt-6 rounded">
        {combos?.data.map((combo) => {
          const selectedItem = selectedCombos.find(
            (item) => item.id === combo.id
          );
          return (
            <div key={combo.id} className="flex items-center gap-4">
              <img
                src={combo.img_thumbnail}
                alt="combo"
                className="w-12 h-12 md:w-20 md:h-20 rounded-full"
              />
              <div className="flex-1 text-sm md:text-base">
                <p className="font-semibold">{combo.name}</p>
                <p className="text-xs text-gray-600">{combo.description}</p>
              </div>
              <div className="w-18 flex items-center gap-2">
                <button
                  onClick={() => handleDecrease(combo.id, combo.discount_price)}
                  className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                  disabled={!selectedItem}
                >
                  -
                </button>
                <span className="px-1">{selectedItem?.quantity || 0}</span>
                <button
                  onClick={() => handleIncrease(combo.id, combo.discount_price)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Combo;
