import Marquee from "react-fast-marquee";
const Templates = () => {
  return (
    <div className="flex h-auto mt-40 border p-10 rounded-lg">
      <div className="flex flex-col w-2/5 mr-10">
        <h1 className="text-4xl mb-6">
          <span className="text-[#0e86d4]">
            Invoice templates that make you
          </span>{" "}
          look professional
        </h1>
        <div className="divider"></div>
        <div className="flex my-4">
          <div>
            <h1 className="text-3xl font-medium">Multiple</h1>
            <p>Templates</p>
          </div>
          <div className="divider divider-horizontal"></div>
          <div>
            <h1 className="text-3xl font-medium">Flexible</h1>
            <p>Customization</p>
          </div>
        </div>
        <div className="divider  mb-6"></div>
        <button className="btn btn-md bg-[#0e86d4] text-white w-[200px]">
          Create free invoices
        </button>
      </div>
      <div className="w-3/5 py-4 bg-slate-200 h-[500px] flex justify-center items-center rounded-lg">
        <Marquee>
          <img
            src="https://i.ibb.co.com/dJCcc93/Modern-Neutral-Invoice-Template.png"
            alt=""
            className="w-[300px] mx-4 rounded-lg"
          />
          <img
            src="https://i.ibb.co.com/0YCsNG0/White-Clean-Professional-Business-Invoice.png"
            alt=""
            className="w-[300px] mx-4 rounded-lg"
          />
          <img
            src="https://i.ibb.co.com/cTzkkMt/White-Clean-Professional-Business-Invoice-Template.png"
            alt=""
            className="w-[300px] mx-4 rounded-lg"
          />
          <img
            src="https://i.ibb.co.com/4J5q9hk/White-Gold-Simple-Business-Invoice.png"
            alt=""
            className="w-[300px] mx-4 rounded-lg"
          />
          <img
            src="https://i.ibb.co.com/NWMgz0Z/White-Minimalist-Contractor-Invoice-Template.png"
            alt=""
            className="w-[300px] mx-4 rounded-lg"
          />
        </Marquee>
      </div>
    </div>
  );
};
export default Templates;
