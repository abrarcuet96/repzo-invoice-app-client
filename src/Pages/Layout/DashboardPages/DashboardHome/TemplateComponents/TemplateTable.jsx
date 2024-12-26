const TemplateTable = ({ quoteItems }) => {
  const subtotal = quoteItems?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <>
      {quoteItems?.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto">
            <thead className="bg-blue-200">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm sm:text-base">
                  Description
                </th>
                <th className="border border-gray-200 px-4 py-2 text-right text-sm sm:text-base">
                  Quantity
                </th>
                <th className="border border-gray-200 px-4 py-2 text-right text-sm sm:text-base">
                  Unit Price
                </th>
                <th className="border border-gray-200 px-4 py-2 text-right text-sm sm:text-base">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {quoteItems.map((item) => (
                <tr key={item.itemId}>
                  <td className="border border-gray-200 px-4 py-2 text-sm sm:text-base">
                    {item.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-right text-sm sm:text-base">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-right text-sm sm:text-base">
                    {item.price.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-right text-sm sm:text-base">
                    {(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-blue-100">
                <td
                  colSpan="3"
                  className="border border-gray-200 px-4 py-2 text-right font-semibold text-sm sm:text-base"
                >
                  Subtotal
                </td>
                <td className="border border-gray-200 px-4 py-2 text-right text-sm sm:text-base">
                  {subtotal.toFixed(2)}
                </td>
              </tr>
              <tr className="bg-blue-100">
                <td
                  colSpan="3"
                  className="border border-gray-200 px-4 py-2 text-right font-bold text-sm sm:text-base"
                >
                  Total
                </td>
                <td className="border border-gray-200 px-4 py-2 text-right font-bold text-sm sm:text-base">
                  {subtotal.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto">
            <thead className="bg-blue-200">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm sm:text-base">
                  Description
                </th>
                <th className="border border-gray-200 px-4 py-2 text-right text-sm sm:text-base">
                  Quantity
                </th>
                <th className="border border-gray-200 px-4 py-2 text-right text-sm sm:text-base">
                  Unit Price
                </th>
                <th className="border border-gray-200 px-4 py-2 text-right text-sm sm:text-base">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2 text-sm sm:text-base">
                  Product A
                </td>
                <td className="border border-gray-200 px-4 py-2 text-right text-sm sm:text-base">
                  4
                </td>
                <td className="border border-gray-200 px-4 py-2 text-right text-sm sm:text-base">
                  $60.00
                </td>
                <td className="border border-gray-200 px-4 py-2 text-right text-sm sm:text-base">
                  $240.00
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2 text-sm sm:text-base">
                  Service B
                </td>
                <td className="border border-gray-200 px-4 py-2 text-right text-sm sm:text-base">
                  2
                </td>
                <td className="border border-gray-200 px-4 py-2 text-right text-sm sm:text-base">
                  $120.00
                </td>
                <td className="border border-gray-200 px-4 py-2 text-right text-sm sm:text-base">
                  $240.00
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-blue-100">
                <td
                  colSpan="3"
                  className="border border-gray-200 px-4 py-2 text-right font-semibold text-sm sm:text-base"
                >
                  Subtotal
                </td>
                <td className="border border-gray-200 px-4 py-2 text-right text-sm sm:text-base">
                  $480.00
                </td>
              </tr>
              <tr>
                <td
                  colSpan="3"
                  className="border border-gray-200 px-4 py-2 text-right font-semibold text-sm sm:text-base"
                >
                  Tax (10%)
                </td>
                <td className="border border-gray-200 px-4 py-2 text-right text-sm sm:text-base">
                  $48.00
                </td>
              </tr>
              <tr className="bg-blue-100">
                <td
                  colSpan="3"
                  className="border border-gray-200 px-4 py-2 text-right font-bold text-sm sm:text-base"
                >
                  Total
                </td>
                <td className="border border-gray-200 px-4 py-2 text-right font-bold text-sm sm:text-base">
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

export default TemplateTable;
