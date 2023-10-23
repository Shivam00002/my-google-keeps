import React, { FC } from "react";

type TTextAreaProps = {
  value: string;
  handleInputs: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea: FC<TTextAreaProps> = ({ value, handleInputs }) => {
  return (
    <div>
      <textarea
        placeholder="Enter your content here..."
        onChange={handleInputs}
        value={value}
        className="outline-none w-full h-[160px] text-sm font-normal "
      />
    </div>
  );
};

export default TextArea;
