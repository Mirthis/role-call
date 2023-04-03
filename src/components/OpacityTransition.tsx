import { Transition } from "@headlessui/react";

const OpacityTransition = ({
  show,
  appear = false,
  children,
}: {
  show: boolean;
  appear?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Transition
      appear={appear}
      show={show}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
};

export default OpacityTransition;
