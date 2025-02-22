//INTL_DONE

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import LoadingButton from "./Buttons/LoadingButton";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element | JSX.Element[];
  title: string | JSX.Element;
  textButton?: string;
  xlSize?: string;
  dontShowButton?: boolean;
  dontShowCancelButton?: boolean;
  clickOutside?: boolean;
  loading?: boolean;
  besideTitleComponent?: JSX.Element;

  onValidate?: () => void;
};

const Modal = ({
  open,
  setOpen,
  title,
  textButton,
  children,
  dontShowButton,
  dontShowCancelButton = true,
  clickOutside = true,
  loading,
  xlSize,
  onValidate = () => {},
  besideTitleComponent,
}: Props) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        // onClose={setOpen}
        onClose={(value) => {
          console.log(value);
          if (!clickOutside) return;
          else setOpen(value);
        }}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                // className={`relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full ${
                //   xlSize ? ` sm:max-w-${xlSize}xl` : 'sm:max-w-xl'
                // } sm:p-6`}
                className={
                  // `relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl
                  `relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl
                ${xlSize === "-2" && `sm:max-w-xs`}
                ${xlSize === "-1" && `sm:max-w-sm`}
                ${xlSize === "0" && `sm:max-w-lg`}
                ${xlSize === "1" && `sm:max-w-xl`}
                 ${xlSize === "2" && `sm:max-w-2xl`}
                ${xlSize === "3" && `sm:max-w-3xl`}
                ${xlSize === "4" && `sm:max-w-4xl`}
                ${xlSize === "5" && `sm:max-w-5xl`} 
                ${xlSize === "6" && `sm:max-w-6xl`} 
                ${xlSize === "7" && `sm:max-w-7xl`} 
                sm:p-6`
                }
              >
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left flex-grow w-full">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900 flex justify-between items-center"
                    >
                      <span className="text-lg truncate">{title}</span>
                      <div className="flex gap-3">
                        {besideTitleComponent}
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">something</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </DialogTitle>
                    {/* <div className='mt-2 min-h-60'> */}
                    <div className="mt-2 w-full">
                      <div className="text-sm text-gray-500">{children}</div>
                    </div>
                  </div>
                </div>
                {!dontShowButton && (
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    {!!loading && (
                      <div className="ml-2">
                        <LoadingButton />{" "}
                      </div>
                    )}

                    {!loading && (
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                        onClick={() => {
                          onValidate();
                          //setOpen(false);
                        }}
                      >
                        {textButton}
                      </button>
                    )}

                    {!!dontShowCancelButton && (
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        cancel
                      </button>
                    )}
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
