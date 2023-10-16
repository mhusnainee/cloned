function Section({ property, value }) {
  return (
    <div
      className={`w-[90%] h-[30px] flex flex-row items-end  ${
        value && "border-t"
      } border-t-black mt-[5px]`}
    >
      <h1 className="mr-[5px]">{value && property}</h1>
    </div>
  );
}

export default Section;
