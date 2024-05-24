import React, { InputHTMLAttributes } from 'react';
import InputMask from 'react-input-mask';

import { cn } from '@/lib/utils';

export interface PhoneInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (v: string) => void;
  error?: string | null;
  forForm?: boolean;
  disabled?: boolean;
}

const PhoneInput = ({
  value,
  onChange,
  error,
  forForm,
  disabled,
  ...props
}: PhoneInputProps) => {
  return (
    <div className="w-full">
      <InputMask
        mask={'+375 (99) 999-99-99'}
        placeholder={'+375 (29) 999-99-99'}
        className={cn(
          'w-full h-10 bg-white border-[#BEBEBE] rounded-full text-black px-5 text-xs focus:bg-custom-white focus:outline-none',
          error ? 'border-[#EB5757]' : '',
          forForm && 'px-4 py-2 h-auto font-medium',
        )}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        disabled={disabled}
        {...props}
      />
      {error && <p className="text-[#EB5757] text-xs mt-1">{error}</p>}
    </div>
  );
};

export default React.memo(PhoneInput);
