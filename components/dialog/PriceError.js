import { useField, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
export default function PriceError({ placeholder, bottom, ...props }) {
  const web3 = useSelector((state) => state.wallet.web3);
  const [field, meta] = useField(props);
  const view1 = useMediaQuery({
    query: "(min-width: 539px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  const test1 = view3 && field.name === "name";
  const test2 = view3 && field.name === "name";
  const [dynamicCustomTokenName, setDynamicCustomTokenName] = useState("BNB");
  useEffect(() => {
    try {
      web3.eth.net.getId().then((netWorkId) => {
        switch (netWorkId) {
          case 5777:
            //codeblock
            setDynamicCustomTokenName("ETH");
            break;
          case 1:
            setDynamicCustomTokenName("ETH");
            break;
          case 56:
            setDynamicCustomTokenName("BNB");
            break;
          case 97:
            setDynamicCustomTokenName("BNB");
            break;
          case 80001:
            setDynamicCustomTokenName("ETH");
            break;
          case 137:
            setDynamicCustomTokenName("ETH");
            break;
          default:
            setDynamicCustomTokenName("BNB");
        }
      });
    } catch (e) {}
  }, [web3]);

  return (
    <div className="relative text-[#B4BEAF] w-full mt-3">
      <input
        className={
          meta.touched && meta.error
            ? "text-[B4BEAF] text-sm p-3.5 !w-full  rounded-md border border-[#9FA4FF] bg-[#000000] dark:bg-white focus:outline-none focus:ring-2r"
            : "text-[B4BEAF] text-sm p-3.5 !w-full  rounded-md border border-[#9FA4FF] bg-[#000000] dark:bg-white focus:outline-none focus:ring-2r"
        }
        style={{
          width: `${
            view1 && (field.name === "name" || field.name === "name")
              ? "100%"
              : view1 && (field.name === "name" || field.name === "name")
              ? "370px"
              : "300px"
          }`,
        }}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      <p className="absolute top-1/2 right-5 -translate-y-1/2 text-sm text-white">
        {dynamicCustomTokenName}
      </p>
      {meta.touched && meta.error && (
        <div
          className={view3 ? "input_error input_error_desktop" : "input_error"}
          style={{
            transform: "translateY(2px)",
            left: `${test1 ? "-107%" : test2 ? "107%" : ""}`,
          }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                view3 && field.name !== "name"
                  ? "error_arrow_left"
                  : view3 && field.name === "name"
                  ? "error_arrow_right"
                  : !view3 && "error_arrow_bottom"
              }
            ></div>
          )}
        </div>
      )}

      {meta.touched && meta.error && <i className="error_icon"></i>}
    </div>
  );
}
