import Leavecategory from "./Leavecategory";

function Leavetype({ data, setSelected }) {
  return (
    <div className="w-full h-fit grid grid-cols-1 smd:grid-cols-2 xl:grid-cols-3 gap-4 py-[10px]">
      {data.map((leave, index) => {
        return (
          <Leavecategory key={index} leave={leave} setSelected={setSelected} />
        );
      })}
    </div>
  );
}

export default Leavetype;
