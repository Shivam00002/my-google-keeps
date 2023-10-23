import React, { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  modalOpen: boolean;
  setModalOpen: (state: boolean) => void;
  optionalStyle?: string;
};

const ModalWrapper: React.FC<Props> = ({
  children,
  modalOpen,
  setModalOpen,
  optionalStyle = "bg-white",
}) => {
  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modal.current) return;
      if (
        !modalOpen ||
        modal.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div>
      <div ref={trigger}></div>
      <div
        className={`fixed top-0 left-0 z-10 flex h-full min-h-screen w-full overflow-scroll items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm px-4 py-5 ${
          modalOpen ? "block" : "hidden"
        }`}
      >
        <div
          ref={modal}
          className={`w-fit rounded-lg py-12 px-8 dark:bg-boxdark md:py-15 md:px-17.5 ${optionalStyle}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
