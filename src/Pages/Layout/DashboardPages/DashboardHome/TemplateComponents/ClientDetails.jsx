const ClientDetails = ({ customer }) => {
  return (
    <>
      {customer ? (
        <div>
          <h3 className="text-md lg:text-xl font-semibold text-blue-700">
            Bill To:
          </h3>
          <p className="text-sm lg:text-lg mt-2 text-gray-700">
            {customer.name}
          </p>
          <p className="text-sm lg:text-lg text-gray-700">{`${customer.address.street}, ${customer.address.country}`}</p>
          <p className="text-sm lg:text-lg text-gray-700">
            {`${customer.address.city}, ${customer.address.state}, ${customer.address.postalCode}`}
          </p>
          <p className="text-sm lg:text-lg text-gray-700">
            Email: {customer.email}
          </p>
        </div>
      ) : (
        <div>
          <h3 className="text-sm lg:text-lg  font-semibold text-blue-700">
            Bill To:
          </h3>
          <p className="text-sm lg:text-lg mt-2 text-gray-700">Client Name</p>
          <p className="text-sm lg:text-lg text-gray-700">456 Client Street</p>
          <p className="text-sm lg:text-lg text-gray-700">City, State, ZIP</p>
          <p className="text-sm lg:text-lg text-gray-700">
            Email: client@domain.com
          </p>
        </div>
      )}
    </>
  );
};
export default ClientDetails;
