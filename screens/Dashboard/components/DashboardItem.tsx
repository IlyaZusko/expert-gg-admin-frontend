import React, { ReactNode } from 'react';

interface IDashboardItem {
  value: string | number;
  title: string;
  description: string;
  icon: ReactNode;
}

const DashboardItem = ({ value, title, description, icon }: IDashboardItem) => {
  return (
    <div className="w-full max-w-[280px] bg-custom-cover rounded-[8px] px-4 py-3 flex flex-col">
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-semibold text-[42px] text-custom-blue">{value}</p>
        {icon}
      </div>
      <p className="text-lg font-medium">{title}</p>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  );
};

export default DashboardItem;
