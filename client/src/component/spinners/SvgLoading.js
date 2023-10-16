import { loadingSvg } from "../../assets/icons";

function SvgLoading() {
  return (
    <div className="w-full py-3 flex items-center justify-center text-black mt-24">
      <span>{loadingSvg}</span>
      <h1>Loading, please wait!</h1>
    </div>
  );
}

export default SvgLoading;
