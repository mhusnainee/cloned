function Loading({ loading }) {
  return (
    loading && (
      <div
        className={`fixed w-full h-screen top-0 left-0 flex flex-col justify-center items-center bg-black/50 z-[39] backdrop-blur-[2px]`}
      >
        <div className="w-[30px] h-[30px] border-[2px] sm:w-[50px] sm:h-[50px] sm:border-[3px] md:w-[70px] md:h-[70px] md:border-[5px] xl:w-[80px] xl:h-[80px] rounded-[50%] border-white border-t-transparent dark:border-t-transparent animate-spin"></div>
      </div>
    )
  );
}

export default Loading;
