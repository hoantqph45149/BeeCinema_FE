import { ChevronDown, ChevronRight, CloudHail } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useBrancheContext } from "../../Contexts/branche/useBrancheContext";

export default function LocationSelect() {
  const { branches, cinema, setCinema } = useBrancheContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (cinema) => {
    setCinema(cinema);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-center items-center w-full md:min-w-[180px] text-sm px-2 xl:text-base sm:px-8 py-1 xl:py-2 lg:px-4 bg-primary text-secondary font-semibold border rounded-lg"
      >
        Bee {cinema.name} <ChevronDown className="ml-2 w-4 h-4 sm:h-5 sm:w-5" />
      </button>

      {isOpen && (
        <div className="absolute md:left-0 mt-2 sm:w-full w-[180px] bg-primary border-t-[3px] border-accent shadow-lg z-[9999]">
          {branches.map((branche) => (
            <div key={branche.name} className="relative group">
              <button
                className={`flex justify-between items-center w-full px-4 py-2 hover:bg-accent hover:text-primary ${
                  isMobile ? "border-b font-bold text-[#595f65]" : ""
                }`}
              >
                {branche.name}
                {!isMobile && branche.cinemas.length > 0 && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {branche.cinemas.length > 0 && (
                <div
                  className={`${
                    isMobile
                      ? "block border-t bg-white"
                      : "absolute left-full top-2 mt-[-8px] w-40 bg-white border-t-2 border-accent shadow-lg hidden group-hover:block"
                  }`}
                >
                  {branche.cinemas.map((cinema) => (
                    <button
                      key={cinema.id}
                      onClick={() => handleSelect(cinema)}
                      className="block w-full px-4 py-2 text-[#767F88] text-left hover:bg-accent hover:text-primary"
                    >
                      Bee {cinema.name}
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
