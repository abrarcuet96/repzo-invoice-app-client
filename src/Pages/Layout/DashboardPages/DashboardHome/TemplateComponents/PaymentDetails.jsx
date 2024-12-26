const PaymentDetails = ({ quoteDueDate }) => {
  return (
    <>
      {quoteDueDate ? (
        <div>
          <h3 className="text-sm lg:text-xl font-semibold text-blue-700">
            Payment Details:
          </h3>
          <p className="text-sm lg:text-xl mt-2 text-gray-700">
            Due Date: {quoteDueDate}
          </p>
        </div>
      ) : (
        <div>
          <h3 className=" text-sm lg:text-xl font-semibold text-blue-700">
            Payment Details:
          </h3>
          <p className="text-sm lg:text-xl mt-2 text-gray-700">
            Due Date: 2024-12-10
          </p>
        </div>
      )}
    </>
  );
};
export default PaymentDetails;
