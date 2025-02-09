import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import LoadingButton from "./Buttons/LoadingButton";

type Props = {
  data: {
    show: boolean;
    data: any;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      data: any;
    }>
  >;
  title: string;
  loading?: boolean;
  onConfirm?: () => void;
  action?: () => void;
};

const ConfirmModal = ({
  data,
  setData,
  title,
  loading,
  onConfirm = () => {},
}: Props) => {
  const cancelButtonRef = useRef(null);

  const [tit, setTit] = useState(title);

  useEffect(() => {
    setTimeout(() => {
      if (data.show) {
        setTit(title);
      }
    }, 50);
  }, [data, title]);

  return (
    <Transition show={data.show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={() => {
          if (!loading) {
            setData({ data: undefined, show: false });
          }
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto border border-red-500">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="flex items-center w-full">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon
                      aria-hidden="true"
                      className="size-6 text-green-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full max-w-[85%]">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900 flex"
                    >
                      <span
                        className=""
                        // className="truncate"
                      >
                        {tit}
                      </span>
                    </DialogTitle>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  {loading ? (
                    <span className=" ml-4">
                      <LoadingButton />
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        onConfirm();
                      }}
                    >
                      Confirmer
                    </button>
                  )}

                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      if (!loading) {
                        setData({ data: undefined, show: false });
                      }
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmModal;
