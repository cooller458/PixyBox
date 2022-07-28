import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  connectDefi,
  connectMetamask,
  walletConnect,
} from "../Redux/wallet-actions";
import cls from "./succes.module.css";
export default function SuccessDialog(props) {
  let msg;
  let title;
  let buttonTitle;
  if (
    props.children.msg != null ||
    props.children.msg != " " ||
    props.children.msg != undefined
  ) {
    msg = props.children.msg;
  } else {
    msg = "Operation completed successfully";
  }

  if (props.children.buttonTitle != null || "" || undefined) {
    buttonTitle = props.children.buttonTitle;
  } else {
    buttonTitle = "View";
  }

  if (props.children.title != null || "" || undefined) {
    title = props.children.title;
  } else {
    title = "Succeeded";
  }
  const dispatch = useDispatch();
  const metaconnect = () => {
    localStorage.setItem("wallet", true);
    dispatch(connectMetamask());
    props.closeSuccessModal();
  };
  const deficonnect = () => {
    dispatch(connectDefi());
    props.closeSuccessModal();
  };
  const walletconnect = () => {
    dispatch(walletConnect());
    props.closeSuccessModal();
  };

  return !props.iswallet ? (
    <Transition appear show={props.show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-100 overflow-y-auto"
        onClose={props.closeSuccessModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the PriceModal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#24274D] dark:bg-white shadow-xl">
              <Dialog.Title
                as="h3"
                className="text-white text-2xl font-semibold leading-6 "
              ></Dialog.Title>

              <div className="flex flex-col items-center space-y-4">
                <div className="text-[#32BA7C] text-7xl">
                  <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                </div>
                <div className="text-white dark:text-gray-800 text-3xl font-semibold">
                  {title}
                </div>
                <div className="text-[#6C71AD] dark:text-gray-600 text-sm">
                  {msg}
                </div>
                <div className="pt-4">
                  <button
                    className="rounded-full bg-[#fbbe16]  text-white text-base px-16 py-2 shadow-md"
                    onClick={props.closeSuccessModal}
                  >
                    {buttonTitle}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  ) : (
    <Transition appear show={props.show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-100 overflow-y-auto"
        onClose={props.closeSuccessModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the PriceModal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#24274D] dark:bg-white shadow-xl">
              <div style={{ padding: "auto", display: "block" }}>
                <div onClick={metaconnect} className={cls.disable}>
                  <img
                    className={cls.walletsvg}
                    alt="meta"
                    src="/assets/meta.png"
                  />
                  <p>MetaMask</p>
                </div>
                <div onClick={walletconnect} className={cls.mobileholder}>
                  <img
                    className={cls.mobilesvg}
                    alt="wallet"
                    src="/assets/eth.png"
                  />
                  <p>Mobile Wallet Apps</p>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
