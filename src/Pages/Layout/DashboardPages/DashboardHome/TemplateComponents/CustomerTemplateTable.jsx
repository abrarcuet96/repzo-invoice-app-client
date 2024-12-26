const CustomerTemplateTable = ({ invoiceItems }) => {
  const subtotal = invoiceItems?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <>
      {invoiceItems?.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto text-sm">
            <thead className="bg-blue-200">
              <tr>
                <th className="border border-gray-200 px-2 py-2 text-left sm:px-4 sm:py-3">
                  Description
                </th>
                <th className="border border-gray-200 px-2 py-2 text-right sm:px-4 sm:py-3">
                  Quantity
                </th>
                <th className="border border-gray-200 px-2 py-2 text-right sm:px-4 sm:py-3">
                  Unit Price
                </th>
                <th className="border border-gray-200 px-2 py-2 text-right sm:px-4 sm:py-3">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item) => (
                <tr key={item.itemId}>
                  <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right">
                    {item.price.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right">
                    {(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-blue-100">
                <td
                  colSpan="3"
                  className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right font-semibold"
                >
                  Subtotal
                </td>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right">
                  {subtotal.toFixed(2)}
                </td>
              </tr>
              <tr className="bg-blue-100">
                <td
                  colSpan="3"
                  className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right font-semibold"
                >
                  Tax (10%)
                </td>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right">
                  ${(subtotal * 0.1).toFixed(2)}
                </td>
              </tr>
              <tr className="bg-blue-100">
                <td
                  colSpan="3"
                  className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right font-bold"
                >
                  Total
                </td>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right font-bold">
                  ${(subtotal * 1.1).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto text-sm">
            <thead className="bg-blue-200">
              <tr>
                <th className="border border-gray-200 px-2 py-2 text-left sm:px-4 sm:py-3">
                  Description
                </th>
                <th className="border border-gray-200 px-2 py-2 text-right sm:px-4 sm:py-3">
                  Quantity
                </th>
                <th className="border border-gray-200 px-2 py-2 text-right sm:px-4 sm:py-3">
                  Unit Price
                </th>
                <th className="border border-gray-200 px-2 py-2 text-right sm:px-4 sm:py-3">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2">
                  Product A
                </td>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right">
                  4
                </td>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right">
                  $60.00
                </td>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right">
                  $240.00
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2">
                  Service B
                </td>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right">
                  2
                </td>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right">
                  $120.00
                </td>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right">
                  $240.00
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-blue-100">
                <td
                  colSpan="3"
                  className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right font-semibold"
                >
                  Subtotal
                </td>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right">
                  $480.00
                </td>
              </tr>
              <tr>
                <td
                  colSpan="3"
                  className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right font-semibold"
                >
                  Tax (10%)
                </td>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right">
                  $48.00
                </td>
              </tr>
              <tr className="bg-blue-100">
                <td
                  colSpan="3"
                  className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right font-bold"
                >
                  Total
                </td>
                <td className="border border-gray-200 px-2 py-1 sm:px-4 sm:py-2 text-right font-bold">
                  $528.00
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </>
  );
};

export default CustomerTemplateTable;
