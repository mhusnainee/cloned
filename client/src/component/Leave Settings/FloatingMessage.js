import { down, info } from "../../assets/icons";

function FloatingMessage({ name, message, checked, handleChange, label }) {
  return (
    <div className="w-full h-[30px] flex flex-row justify-between items-center mt-[10px] duration-300 dark:text-white">
      <div className="flex flex-row justify-center items-center">
        <h1 className="mr-[5px]">{label}</h1>
        <span className="group mb-[-3px]">
          <div className="absolute mt-[-80px] ml-[-87px] hidden group-hover:flex w-[190px] h-[80px] flex-col justify-around items-center">
            <div className="w-full h-[90%] bg-gray-200 dark:bg-black p-[5px] rounded-[5px]">
              <p className="text-[13px] text-center">{message}</p>
            </div>
            <div className="w-full h-[20px] flex flex-col justify-center items-center mt-[-5px] duration-500 text-gray-200 dark:text-black">
              {down}
            </div>
          </div>
          {info}
        </span>
      </div>

      <label className="relative inline-flex items-center cursor-pointer p-auto">
        <input
          type="checkbox"
          checked={checked}
          name={name}
          className="dark:checked:bg-black duration-500 dark:border-black dark:focus:outline-black dark:focus:ring-black"
          onChange={(e) => handleChange(e)}
        />
      </label>
    </div>
  );
}

export default FloatingMessage;
