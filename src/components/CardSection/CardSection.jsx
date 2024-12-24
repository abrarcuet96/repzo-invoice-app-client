const CardSection = ({ content }) => {
  const { name, target, description, imageUrl } = content;
  return (
    <div className=" bg-white border border-gray-200 rounded-lg shadow">
      <a href="#">
        <img className="rounded-t-lg w-full" src={imageUrl} alt="" />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            {target}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 ">{description}</p>
      </div>
    </div>
  );
};
export default CardSection;
