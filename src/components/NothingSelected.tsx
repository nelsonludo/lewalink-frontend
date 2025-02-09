//INTL_DONE

import { ReactElement } from "react";
import { FaRegFolderClosed } from "react-icons/fa6";

type Props = {
  action?: () => void;
  description: string;
  title: string;
  buttonText?: string;
  noDisplayButton?: boolean;
  noContactButton?: boolean;
  bg?: string;
  icon?: ReactElement;
  spacing?: number;
};

const NothingSelected = ({
  action,
  buttonText,
  description,
  title,
  noDisplayButton,
  bg,
  icon,
  noContactButton,
  spacing,
}: Props) => {
  return (
    <main
      className={`grid place-items-center ${bg ? bg : "bg-white"} px-1  ${
        spacing ? `sm:py-${String(spacing).trim()}` : `sm:py-32`
      } lg:px-8 `}
    >
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600 flex justify-center">
          {icon ? <>{icon}</> : <FaRegFolderClosed className=" size-10 my-3" />}
        </p>
        <h1 className="mt-2 font-normal tracking-tight text-gray-900 sm:text-3xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600">{description}</p>
        {!noDisplayButton && (
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={action}
            >
              {buttonText}
            </button>
            {!noContactButton && (
              <a href="#" className="text-sm font-semibold text-gray-900">
                Contact team
                <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default NothingSelected;
