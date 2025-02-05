import { ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const locations = [
  { name: "Hà Nội", subLocations: ["Poly Hà Đông", "Poly Mỹ Đình"] },
  { name: "Hồ Chí Minh", subLocations: ["Poly Quang Trung", "Poly Tân Bình"] },
  { name: "Đà Nẵng", subLocations: [] },
  { name: "Hải Phòng", subLocations: [] },
];

export default function LocationSelect() {
  const [selected, setSelected] = useState("Poly Hà Đông");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSelect = (location) => {
    setSelected(location);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full md:w-auto text-sm px-2 sm:text-base sm:px-8 py-2 lg:px-4 bg-primary text-secondary font-semibold border rounded-lg"
      >
        {selected} <ChevronDown className="ml-2 w-4 h-4 sm:h-5 sm:w-5" />
      </button>

      {isOpen && (
        <div className="absolute md:left-0 mt-2 sm:w-full w-[180px] bg-primary border-t-[3px] border-accent shadow-lg">
          {locations.map((location) => (
            <div key={location.name} className="relative group">
              <button
                className={`flex justify-between items-center w-full px-4 py-2 hover:bg-accent hover:text-primary ${
                  isMobile ? "border-b font-bold text-[#595f65]" : ""
                }`}
              >
                {location.name}
                {!isMobile && location.subLocations.length > 0 && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {location.subLocations.length > 0 && (
                <div
                  className={`${
                    isMobile
                      ? "block border-t bg-white"
                      : "absolute left-full top-2 mt-[-8px] w-40 bg-white border-t-2 border-accent shadow-lg hidden group-hover:block"
                  }`}
                >
                  {location.subLocations.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => handleSelect(sub)}
                      className="block w-full px-4 py-2 text-[#767F88] text-left hover:bg-accent hover:text-primary"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
