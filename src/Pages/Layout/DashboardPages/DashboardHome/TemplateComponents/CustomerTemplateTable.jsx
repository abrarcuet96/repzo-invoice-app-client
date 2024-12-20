const CustomerTemplateTable = ({ invoiceItems }) => {
  const subtotal = invoiceItems?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  return (
    <>
      {invoiceItems?.length ? (
        <table className="w-full border-collapse">
          <thead className="bg-blue-200">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Description
              </th>
              <th className="border border-gray-200 px-4 py-2 text-right">
                Quantity
              </th>
              <th className="border border-gray-200 px-4 py-2 text-right">
                Unit Price
              </th>
              <th className="border border-gray-200 px-4 py-2 text-right">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceItems.map((item) => (
              <tr key={item.itemId}>
                <td className="border border-gray-200 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-right">
                  {item.quantity}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-right">
                  {item.price.toFixed(2)}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-right">
                  {(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-blue-100">
              <td
                colSpan="3"
                className="border border-gray-200 px-4 py-2 text-right font-semibold"
              >
                Subtotal
              </td>
              <td className="border border-gray-200 px-4 py-2 text-right">
                {subtotal.toFixed(2)}
              </td>
            </tr>
            <tr className="bg-blue-100">
              <td
                colSpan="3"
                className="border border-gray-200 px-4 py-2 text-right font-bold"
              >
                Total
              </td>
              <td className="border border-gray-200 px-4 py-2 text-right font-bold">
                {subtotal.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <table className="w-full border-collapse">
          <thead className="bg-blue-200">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Description
              </th>
              <th className="border border-gray-200 px-4 py-2 text-right">
                Quantity
              </th>
              <th className="border border-gray-200 px-4 py-2 text-right">
                Unit Price
              </th>
              <th className="border border-gray-200 px-4 py-2 text-right">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Product A</td>
              <td className="border border-gray-200 px-4 py-2 text-right">4</td>
              <td className="border border-gray-200 px-4 py-2 text-right">
                $60.00
              </td>
              <td className="border border-gray-200 px-4 py-2 text-right">
                $240.00
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Service B</td>
              <td className="border border-gray-200 px-4 py-2 text-right">2</td>
              <td className="border border-gray-200 px-4 py-2 text-right">
                $120.00
              </td>
              <td className="border border-gray-200 px-4 py-2 text-right">
                $240.00
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="bg-blue-100">
              <td
                colSpan="3"
                className="border border-gray-200 px-4 py-2 text-right font-semibold"
              >
                Subtotal
              </td>
              <td className="border border-gray-200 px-4 py-2 text-right">
                $480.00
              </td>
            </tr>
            <tr>
              <td
                colSpan="3"
                className="border border-gray-200 px-4 py-2 text-right font-semibold"
              >
                Tax (10%)
              </td>
              <td className="border border-gray-200 px-4 py-2 text-right">
                $48.00
              </td>
            </tr>
            <tr className="bg-blue-100">
              <td
                colSpan="3"
                className="border border-gray-200 px-4 py-2 text-right font-bold"
              >
                Total
              </td>
              <td className="border border-gray-200 px-4 py-2 text-right font-bold">
                $528.00
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </>
  );
};
export default CustomerTemplateTable;
