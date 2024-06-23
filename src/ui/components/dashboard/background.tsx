export const Background = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full negative-z-index">
      {/* SMALL DEVICES */}
      <div className="md:hidden">
        <div className="bg-top-left w-[48px] h-[202px] bg-sm-left"></div>
        <div className="bg-top-right w-[269px] h-[678px] bg-sm-blob-right dark:hidden"></div>
        <div className="bg-top-right top-0 w-[375px] h-[814px] bg-sm-right"></div>
      </div>
      {/* MEDIUM DEVICES */}
      <div className="hidden md:block lg:hidden">
        <div className="bg-top-left w-[67px] h-[323px] bg-md-left"></div>
        <div className="bg-top-right w-[332px] h-[640px] bg-md-blob-right dark:hidden"></div>
        <div className="bg-top-right w-[583px] h-[640px] bg-md-right"></div>
      </div>
      {/* LARGE DEVICES */}
      <div className="hidden lg:block">
        <div className="bg-top-left w-[742px] h-[800px] bg-lg-blob-left dark:hidden"></div>
        <div className="bg-top-left w-[116px] h-[398px] bg-lg-left"></div>
        <div className="bg-top-right w-[725px] h-[689px] bg-lg-blob-right dark:hidden"></div>
        <div className="bg-top-right w-[913px] h-[800px] bg-lg-right"></div>
      </div>
    </div>
  );
};
