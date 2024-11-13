import homeBanner from "./../../assets/home banner.png";
const Banner = () => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${homeBanner})` }}
        className="bg-cover bg-center h-[600px] w-full  flex justify-center items-center"
      >
        <div className="w-1/2 p-8">
          <h1 className="text-4xl my-4">
            <span className="text-[#0e86d4] font-semibold">
              Free Tax Invoice Software
            </span>{" "}
            your business will absolutely love!
          </h1>
          <p className=" my-4">
            Zoho Invoice is the ultimate invoicing software to help you create
            invoice templates, send them to customers, and accept payments
            online. It works on all your devices and is completely free!
          </p>
          <div className=" my-4 space-x-4">
            <button className="btn bg-[#0e86d4] text-white">
              Start invoicing for free
            </button>
            <button className="btn">Explore demo account</button>
          </div>
        </div>
        <div className="w-1/2"></div>
      </div>
    </>
  );
};
export default Banner;
