import React, { FC } from "react";

type TInputFeild = {
  value?: string;
  placeholder?: string;
  handleInputChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: FC<TInputFeild> = ({
  value,
  placeholder,
  handleInputChange,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className="outline-none text-black font-semibold text-sm w-full"
      />
    </div>
  );
};

export default InputField;
