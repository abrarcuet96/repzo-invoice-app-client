const InvoiceIdAndIssueDate = ({ quoteId, quoteDate }) => {
  return (
    <>
      {quoteId && quoteDate ? (
        <>
          <p className="mt-2">Invoice No.: {quoteId}</p>
          <p>Issued on: {quoteDate.match(/\w{3} \w{3} \d{2} \d{4}/)[0]}</p>
        </>
      ) : (
        <>
          <p className="mt-2">Invoice #: 2024-001</p>
          <p>Issued on: 2024-11-26</p>
        </>
      )}
    </>
  );
};
export default InvoiceIdAndIssueDate;
