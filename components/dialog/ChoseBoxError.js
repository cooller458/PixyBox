import { useMediaQuery } from "react-responsive";

export default function ChoseBoxError({ error, handleRegisterChange }) {
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
      name: "Choose Time",
      value: "Choose",
    },
    {
      id: 1,
      name: "7 Days",
      value: "7",
    },
    {
      id: 2,
      name: "14 Days",
      value: "14",
    },
    {
      id: 3,
      name: "30 Days",
      value: "30",
    },
    {
      id: 4,
      name: "90 Days",
      value: "90",
    },
  ];
  return (
    <div
      className="reg_grid"
      style={{ marginBottom: `${error && !view3 ? "90px" : "0"}` }}
    >
      <select
        name="ChooseBox"
        className="text-[#B4BEAF] text-sm px-3.5 py-3.5 w-full mt-3 rounden rounded-md border border-[#000000] bg-black  focus:outline-none focus:ring-2 appearance-none "
        onChange={handleRegisterChange}
      >
        {obj.map((employee) => (
          <option value={employee.value} key={employee.id}>
            {employee.name}
          </option>
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
