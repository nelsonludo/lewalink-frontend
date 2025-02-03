//INTL_DONE

import React, { FC, useState } from "react";

type PropsTooltip<P> = P & {
  text: string;
  children: React.ReactNode;
};

export const Tooltip: FC<PropsTooltip<any>> = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <>
        {/* <div className="relative w-full border border-red-500">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="cursor-pointer truncate w-full"
      >
        {children}
      </div>
      {showTooltip && (
        <div
          className="absolute -top-7 px-1.5 py-1 text-xs text-white bg-gray-800 rounded shadow-lg"
          style={{ zIndex: 99999 }}
        >
          {text}
        </div>
      )}
    </div> */}
      </>

      <div
        // className="relative inline-block w-full"
        className="relative inline-block"
      >
        {/* {children} */}
        <div
          // className="cursor-pointer w-[13.8rem]"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {children}
          {/* <p
          // className="truncate"
          >
            {children}
          </p> */}
        </div>

        {showTooltip && (
          <div
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded-md"
            style={{zIndex: 9999}}
          >
            {text}
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-3 h-3 bg-gray-800 rotate-45" />
          </div>
        )}
      </div>
    </>
  );
};
