import React, { InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (v: string) => void;
  placeholder: string;
  error?: string | null;
  isCustomWith?: boolean;
  label?: string;
}

const TextInput = ({
  value,
  onChange,
  type,
  error,
  placeholder,
  isCustomWith,
  label,
  ...props
}: TextInputProps) => {
  return (
    <div className={cn('w-full', isCustomWith && 'max-w-max')}>
      {label && <p className="text-xs text-white pb-[2px]">{label}</p>}
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          'flex h-10 w-full rounded-[8px] px-3 py-2 border border-gray-700 focus:border-custom-blue text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent',
          error && 'border-[#EB5757]',
          props.className && props.className,
        )}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        style={{
          outline: 'none',
        }}
      />
      {error && <p className="text-[#EB5757] text-xs mt-1">{error}</p>}
    </div>
  );
};

export default React.memo(TextInput);
