const InvoiceIdAndIssueDate = ({ quoteId, quoteDate }) => {
  return (
    <>
      {quoteId && quoteDate ? (
        <>
          <p className="mt-2 text-sm lg:text-lg">Invoice No.: {quoteId}</p>
          <p className=" text-sm lg:text-lg">
            Issued on: {quoteDate.match(/\w{3} \w{3} \d{2} \d{4}/)[0]}
          </p>
        </>
      ) : (
        <>
          <p className="mt-2 text-sm lg:text-lg">Invoice #: 2024-001</p>
          <p className=" text-sm lg:text-lg">Issued on: 2024-11-26</p>
        </>
      )}
    </>
  );
};
export default InvoiceIdAndIssueDate;
