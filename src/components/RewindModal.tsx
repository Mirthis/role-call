import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useChatStore } from "~/utils/store";

const RewindModal = ({
  isOpen,
  rewindToId,
  onClose,
}: {
  isOpen: boolean;
  rewindToId: number;
  onClose: () => void;
}) => {
  const rewind = useChatStore((state) => state.rewind);

  const rewindAndClose = () => {
    rewind(rewindToId);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  Rewind Chat
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text">
                    Are you sure you want to rewind the chat? All messages after
                    the selected message will be deleted and cannot be
                    recovered.
                  </p>
                </div>

                <div className=" mt-4 flex gap-x-4">
                  <button
                    type="button"
                    className="btn-ghost btn"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn-error btn"
                    onClick={rewindAndClose}
                  >
                    Rewind
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RewindModal;
