import Filters from "./Filters";

const Univertities = () => {
  return (
    <div className="bg-[#F4EAFF]">
      <div className="w-full h-50">
        <img src="/images/homeBanner.png" alt="" className="w-full h-full" />
      </div>
      <div className="flex flex-row py-5 px-10 gap-4">
        <div className="w-[25%]">
          <Filters />
        </div>
        <div className="w-[75%]"></div>
      </div>
    </div>
  );
};

export default Univertities;
