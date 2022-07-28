import { useField, ErrorMessage } from "formik";
import { useMediaQuery } from "react-responsive";
export default function DescError({ placeholder, bottom, ...props }) {
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

  return (
    <div className="input_wrap register_input_wrap mt-3">
      <textarea
        className="text-[#B4BEAF] text-sm p-3.5 !w-full rounded-md border border-[#9FA4FF] bg-[#000000]  dark:bg-white focus:outline-none focus=ring-2"
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
      ></textarea>
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
