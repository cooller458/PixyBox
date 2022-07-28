import { useMediaQuery } from "react-responsive";

export default function SelectBoxError({ error, handleRegisterChange }) {
  const view1 = useMediaQuery({
    query: "(min-width: 539px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  let obj = [
    {
      id: 0,
      name: "Choose Box",
      value: "Choose",
    },
    {
      id: 1,
      name: "Locked Box",
      value: "Locked",
    },
    {
      id: 2,
      name: "Unlocked Box",
      value: "Unlocked",
    },
  ];
  return (
    <div
      className="reg_grid"
      style={{ marginBottom: `${error && !view3 ? "90px" : "0"}` }}
    >
      <select name="category" className="text-[#B4BEAF] text-sm px-3.5 py-3.5 w-full mt-3 rounden rounded-md border border-[#000000] bg-black  focus:outline-none focus:ring-2 appearance-none "  onChange={handleRegisterChange}>
        {obj.map((employee) => (
          <option value={employee.value} key={employee.id}>{employee.name}</option>
        ))}
      </select>
      {error && (
        <div
          className={
            !view3 ? "input_error" : "input_error input_error_select_large"
          }
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></div>
          {error}
        </div>
      )}
    </div>
  );
}
