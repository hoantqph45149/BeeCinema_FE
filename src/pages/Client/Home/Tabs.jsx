import { useState } from "react";

export default function Tabs({ tabs, defaultTab, onTabChange }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].label);

  const handleTabClick = (tab) => {
    setActiveTab(tab.label);
    onTabChange && onTabChange(tab);
  };

  return (
    <div className="w-full">
      {/* Thanh Tabs */}
      <div className="text-center">
        <ul className="inline-flex justify-center items-center font-oswald border-b border-[#D9D9D9] bg-primary shadow-md">
          {tabs.map((tab) => (
            <li
              key={tab.label}
              className={`uppercase text-center px-2 md:px-6 py-2 text-xs sm:text-lg md:text-xl lg:text-3xl 
              font-medium md:font-bold transition-colors cursor-pointer ${
                activeTab === tab.label
                  ? " text-accent border-b-4 border-accent"
                  : "text-secondary border-b-4 border-transparent hover:text-accent"
              } `}
              onClick={() => handleTabClick(tab)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Nội dung hiển thị */}
      <div className="mt-16">
        {tabs.find((tab) => tab.label === activeTab)?.content}
      </div>
    </div>
  );
}
