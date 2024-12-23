import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi"; // Trash icon
import { IoAddCircleSharp } from "react-icons/io5"; // Add icon
import { useLoaderData, useNavigate } from "react-router-dom";
import GoBackButton from "../../../../components/GoBackButton/GoBackButton";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import formatDate from "../../../../utils/formatDate";

const AddInvoice = () => {
  const user = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [customerResults, setCustomerResults] = useState([]);
  const [itemResults, setItemResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);
  const [loading, setLoading] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const searchInputRef = useRef(null);
  const searchDropdownRef = useRef(null);
  const itemInputRef = useRef(null);
  const itemDropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutsideSearchInput = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target)
      ) {
        setCustomerResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideSearchInput);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearchInput);
    };
  }, []);

  useEffect(() => {
    const handleClickOutsideItem = (event) => {
      if (
        itemInputRef.current &&
        !itemInputRef.current.contains(event.target) &&
        itemDropdownRef.current &&
        !itemDropdownRef.current.contains(event.target)
      ) {
        setItemResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideItem);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideItem);
    };
  }, []);
  //   const [status, setStatus] = useState("unpaid"); // Invoice status
  const [currency, setCurrency] = useState("USD"); // Default currency
  //   const [paymentStatus, setPaymentStatus] = useState("pending"); // Default payment status

  // Calculate the total from items
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  // Fetch customers when input is clicked
  const onHoverFetchCustomers = () => {
    if (customerResults?.length === 0) {
      axiosPublic.get("/api/customer").then((res) => {
        const neededCustomers = res?.data?.data?.filter(
          (cus) => cus?.userId === user?.data?._id
        );
        if (res.data.success) {
          setCustomerResults(neededCustomers);
        }
      });
    }
  };

  // Fetch items when input is clicked
  const onHoverFetchItems = (index) => {
    const updatedItems = items.map((item, i) => ({
      ...item,
      dropdownVisible: i === index, // Show dropdown only for the clicked item
    }));
    setItems(updatedItems);

    if (itemResults?.length === 0) {
      axiosPublic.get("/api/item").then((res) => {
        const neededItems = res?.data?.data?.filter(
          (ite) => ite?.userId === user?.data?._id
        );

        if (res.data.success) {
          setItemResults(neededItems);
        }
      });
    }
  };

  const onSearchCustomer = (query) => {
    if (!query) {
      setCustomerResults([]);
      return;
    }

    axiosPublic.get(`/api/customer?name=${query}`).then((res) => {
      if (res.data.success) {
        setCustomerResults(res.data.data);
      } else {
        setCustomerResults([]);
      }
    });
  };

  const onSearchItem = (query) => {
    if (!query) {
      setItemResults([]);
      return;
    }

    axiosPublic.get(`/api/item?name=${query}`).then((res) => {
      if (res.data.success) {
        setItemResults(res.data.data);
      } else {
        setItemResults([]);
      }
    });
  };

  const onSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setCustomerResults([]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === "name") {
      axiosPublic.get(`/api/item?name=${value}`).then((res) => {
        if (res.data.success && res.data.data) {
          updatedItems[index].price = res.data.data.price;
          updatedItems[index].itemId = res.data.data.itemId;
          updatedItems[index].name = res.data.data.name;
          setItems(updatedItems);
        }
      });
    } else {
      setItems(updatedItems);
    }
  };

  const onSelectItem = (index, item) => {
    const updatedItems = items.map((it, i) =>
      i === index
        ? {
            ...it,
            name: item.name,
            itemId: item.itemId,
            price: item.price,
            dropdownVisible: false,
          }
        : { ...it, dropdownVisible: false }
    );
    setItems(updatedItems);
  };

  const addItemRow = () => {
    setItems([...items, { itemId: "", name: "", quantity: 1, price: 0 }]);
  };

  const removeItemRow = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const onSubmit = (data) => {
    const issuedDate = formatDate(data.issuedDate);
    console.log(issuedDate);

    const dueDate = formatDate(data.dueDate);
    const invoiceInfo = {
      customerId: selectedCustomer?.customerId,
      issuedDate: issuedDate,
      dueDate: dueDate,
      status: "unpaid",
      currency: currency,
      payment: { status: "pending", amount: calculateTotal() },
      items: items,
      total: calculateTotal(),
      isDeleted: false,
    };
    console.log(invoiceInfo);

    setLoading(true);

    axiosPublic
      .post(`/api/invoice/${user.data._id}`, invoiceInfo)
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          toast.success("Invoice created successfully.");
          reset();
          setTimeout(() => {
            navigate("/dashboard/userInvoices");
          }, 1000);
        } else {
          toast.error("Failed to create the invoice.");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-start  px-4 py-8">
      <div className="w-full max-w-3xl flex flex-col gap-8 bg-white rounded-lg p-3">
        <div className="space-y-6">
          <GoBackButton
            loading={loading}
            navigatePath="/dashboard/userInvoices"
          />

          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
            Create Invoice
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Customer
                </label>
                <input
                  type="text"
                  placeholder="Search for a customer"
                  className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => onSearchCustomer(e.target.value)}
                  onClick={onHoverFetchCustomers}
                  value={selectedCustomer ? selectedCustomer.name : ""}
                  ref={searchInputRef}
                />
                {Array.isArray(customerResults) &&
                  customerResults.length > 0 && (
                    <ul
                      ref={searchDropdownRef}
                      className="absolute bg-white border rounded-lg shadow-lg mt-1 z-10"
                    >
                      {customerResults.map((customer) => (
                        <li
                          key={customer._id}
                          onClick={() => onSelectCustomer(customer)}
                          className="p-3 hover:bg-blue-50 cursor-pointer"
                        >
                          {customer.name} ({customer.email})
                        </li>
                      ))}
                    </ul>
                  )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Issued Date
                </label>
                <input
                  type="date"
                  {...register("issuedDate", {
                    required: "Issued date is required",
                  })}
                  className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                {errors.issuedDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.issuedDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input
                  type="date"
                  {...register("dueDate", { required: "Due date is required" })}
                  className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                {errors.dueDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.dueDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="BDT">BDT</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>

            {/* Invoice Items */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Invoice Items
              </h3>
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">
                      Item
                    </th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">
                      Quantity
                    </th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">
                      Unit Price
                    </th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">
                      Total
                    </th>
                    <th className="p-2 text-center text-sm font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) =>
                            handleItemChange(index, "name", e.target.value)
                          }
                          onClick={() => onHoverFetchItems(index)}
                          className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                          ref={itemInputRef}
                        />
                        {item.dropdownVisible &&
                          Array.isArray(itemResults) &&
                          itemResults.length > 0 && (
                            <ul
                              ref={itemDropdownRef}
                              className="absolute bg-white border rounded-lg shadow-lg max-h-48 mt-1 z-10"
                            >
                              {itemResults.map((result) => (
                                <li
                                  key={result._id}
                                  onClick={() => onSelectItem(index, result)}
                                  className="p-3 hover:bg-blue-50 cursor-pointer"
                                >
                                  {result.name} ({result.price})
                                </li>
                              ))}
                            </ul>
                          )}
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(index, "quantity", e.target.value)
                          }
                          className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            handleItemChange(index, "price", e.target.value)
                          }
                          className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="p-2">{item.quantity * item.price}</td>
                      <td className="p-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={addItemRow}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <IoAddCircleSharp size={25} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItemRow(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Calculation */}
            <div className="mt-6 flex justify-end gap-4 border-t pt-4">
              <div className="w-1/2 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal:</span>
                  <span>
                    {items.reduce(
                      (sum, item) => sum + item.quantity * item.price,
                      0
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total:</span>
                  <span>
                    {items.reduce(
                      (sum, item) => sum + item.quantity * item.price,
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-2 gap-4">
              <button
                type="submit"
                className={`py-2 px-6 text-white rounded-lg ${
                  loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Invoice"}
                <Toaster />
              </button>
            </div>
          </form>
        </div>
        <div className="space-y-6 bg-blue-50 p-6 rounded-md border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-800">
            Payment Amount
          </h3>
          <div className="bg-blue-100 p-4 rounded-md mt-4">
            <p className="text-lg font-semibold text-blue-700">
              Total Amount: {calculateTotal()}
            </p>
          </div>
          <div className="text-sm text-gray-600">
            <p>
              The payment amount is automatically calculated based on the total
              of all invoice items. Ensure the totals match before submitting.
            </p>
            <p className="mt-2">
              Use the "Add" and "Remove" buttons to adjust the items in your
              invoice. The payment amount will update accordingly.
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded-md">
            <p className="text-sm text-blue-700">
              Tip: Double-check the quantities and prices before finalizing the
              payment amount.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInvoice;
