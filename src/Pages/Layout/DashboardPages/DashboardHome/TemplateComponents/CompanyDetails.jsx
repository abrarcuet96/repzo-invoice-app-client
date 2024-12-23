const CompanyDetails = ({ userData }) => {
  return (
    <>
      <h2 className="text-xl font-semibold">
        {userData?.profile?.companyName}
      </h2>
      <p>
        {userData?.profile?.address?.postalCode} -{" "}
        {userData?.profile?.address?.street}
      </p>
      <p>
        {userData?.profile?.address?.state} -{" "}
        {userData?.profile?.address?.country}
      </p>
      <p>{userData?.email}</p>
    </>
  );
};
export default CompanyDetails;
