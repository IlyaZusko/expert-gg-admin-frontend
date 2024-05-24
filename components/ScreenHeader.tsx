import React from 'react';

interface IScreenHeader {
  title: string;
  description: string;
}

const ScreenHeader = ({ title, description }: IScreenHeader) => {
  return (
    <div className="w-full pt-2 pb-3 px-8 border-b border-custom-cover">
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-xs font-medium text-gray-400 pt-1">{description}</p>
    </div>
  );
};

export default ScreenHeader;
