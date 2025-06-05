import React, { FC } from "react";

type CardProps = {
  child: React.ReactNode;
};

const Card: FC<CardProps> = ({ child }) => {
  return (
    <div className="bg-white rounded-xl p-4 w-full flex flex-col gap-2">
      {child}
    </div>
  );
};

export default Card;
