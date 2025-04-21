import { FaCheck } from "react-icons/fa";
const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex gap-3">
      <div className="form-control">
        <label className="flex gap-2 cursor-pointer">
          <span className="label-text">Nam</span>
          <input
            type="checkbox"
            className="hidden checkbox border-slate-900"
            checked={selectedGender === "nam"}
            onChange={() => onCheckboxChange("nam")}
          />
          <div className="relative  w-6 h-6 border border-gray-400 rounded-md">
            {selectedGender === "nam" && (
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FaCheck />
              </span>
            )}
          </div>
        </label>
      </div>
      <div className="form-control">
        <label className="flex gap-2 cursor-pointer ">
          <span className="label-text">Nữ</span>
          <input
            type="checkbox"
            className="hidden checkbox border-slate-900"
            checked={selectedGender === "nữ"}
            onChange={() => onCheckboxChange("nữ")}
          />
          <div className="relative  w-6 h-6 border border-gray-400 rounded-md">
            {selectedGender === "nữ" && (
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FaCheck />
              </span>
            )}
          </div>
        </label>
      </div>
      <div className="form-control">
        <label className="flex gap-2 cursor-pointer ">
          <span className="label-text">Khác</span>
          <input
            type="checkbox"
            className="hidden checkbox border-slate-900"
            checked={selectedGender === "khác"}
            onChange={() => onCheckboxChange("khác")}
          />
          <div className="relative  w-6 h-6 border border-gray-400 rounded-md">
            {selectedGender === "khác" && (
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FaCheck />
              </span>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
