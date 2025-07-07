import { FC } from "react";
interface CustomInputWithFieldsetProps {
  label?: string;
  value: string;
  setValue: (value: string) => void;
}
const CustomInputWithFieldset: FC<CustomInputWithFieldsetProps> = ({
  label,
  value,
  setValue,
}) => {
  return (
    <fieldset className="relative border border-gray-300 rounded-full px-2 py-2 w-full h-13 lg:h-full">
      {/* Legend as the label inside the border */}
      <legend className="px-1 text-[10px] font-bold lg:text-sm text-gray-500">
        {label}
      </legend>

      {/* Select input */}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-transparent appearance-none outline-none text-sm pl-3 pb-2 text-gray-400 absolute left-2 top-0 lg:static lg:pl-3 lg:pb-2"
        placeholder={`enter ${label}`}
      />
    </fieldset>
  );
};

export default CustomInputWithFieldset;
