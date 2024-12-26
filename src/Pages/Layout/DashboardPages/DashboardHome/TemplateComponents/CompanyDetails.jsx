const CompanyDetails = ({ userData }) => {
  return (
    <>
      {userData ? (
        <>
          <h2 className="text-sm lg:text-lg font-semibold">
            {userData?.profile?.companyName}
          </h2>
          <p className="text-sm lg:text-lg ">
            {userData?.profile?.address?.postalCode} -{" "}
            {userData?.profile?.address?.street}
          </p>
          <p className="text-sm lg:text-lg ">
            {userData?.profile?.address?.state} -{" "}
            {userData?.profile?.address?.country}
          </p>
        </>
      ) : (
        <>
          <h2 className="text-sm lg:text-lg font-semibold">
            Your company name
          </h2>
          <p className="text-sm lg:text-lg ">Postal code - Street</p>
          <p className="text-sm lg:text-lg ">State - Country</p>
        </>
      )}
    </>
  );
};
export default CompanyDetails;
