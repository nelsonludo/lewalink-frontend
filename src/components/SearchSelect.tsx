import { FC, useState } from "react";
interface CustomSelectWithFieldsetProps {
  options?: string[];

  label?: string;
}
const CustomSelectWithFieldset: FC<CustomSelectWithFieldsetProps> = ({
  options,
  label,
}) => {
  const [selected, setSelected] = useState("");

  return (
    <fieldset className="relative border border-gray-300 rounded-full px-2 py-2 w-full h-13 lg:h-full">
      {/* Legend as the label inside the border */}
      <legend className="px-1 text-[10px] font-bold lg:text-sm text-gray-500">
        {label}
      </legend>

      {/* Select input */}
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full bg-transparent appearance-none outline-none text-sm pl-3 pb-2 text-gray-400 absolute left-2 top-0 lg:static lg:pl-3 lg:pb-2"
      >
        <option value="" disabled hidden>
          enter {label}
        </option>
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Custom arrow (optional) */}
      <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2">
        <svg
          className="h-4 w-4 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </fieldset>
  );
};

export default CustomSelectWithFieldset;
