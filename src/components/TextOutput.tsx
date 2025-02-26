import React, { ReactNode } from "react";

interface Props {
  label?: ReactNode;
  value?: string | number | undefined;
}

const TextOutput: React.FC<Props> = (props: Props) => {
  const {
    label,
    value,
  } = props;
  return (
    <div className="text-output">
      <div className="label"> { label } </div>
      {label && value && <>&nbsp;</> }
      <div className="value">  { value } </div>
    </div>
  );
};

export default TextOutput;
