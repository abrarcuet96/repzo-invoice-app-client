import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi"; // Material Design icons for plus and trash
import { IoAddCircleSharp } from "react-icons/io5";
import { useLoaderData, useNavigate } from "react-router-dom";
import GoBackButton from "../../../../components/GoBackButton/GoBackButton";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const AddQuote = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [customerResults, setCustomerResults] = useState([]);
  const [itemResults, setItemResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const user = useLoaderData();
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

  const onHoverFetchCustomers = () => {
    if (customerResults?.length === 0) {
      axiosPublic.get(`/api/customer`).then((res) => {
        const neededCustomers = res?.data?.data?.filter(
          (cus) => cus?.userId === user?.data?._id
        );
        if (res.data.success) {
          setCustomerResults(neededCustomers);
        }
      });
    }
  };

  const onHoverFetchItems = (index) => {
    const updatedItems = items.map((item, i) => ({
      ...item,
      dropdownVisible: i === index, // Show dropdown only for the clicked item
    }));
    setItems(updatedItems);

    if (itemResults?.length === 0) {
      axiosPublic.get(`/api/item`).then((res) => {
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
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const removeItemRow = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const onSubmit = (data) => {
    console.log(data);
    const date = new Date(data.expiryDate);

    const gmtPlus6Date = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
    );

    const formattedDate = gmtPlus6Date
      .toString()
      .match(/\w{3} \w{3} \d{2} \d{4}/)[0];

    const quoteInfo = {
      customerId: selectedCustomer?.customerId,
      customerNo: selectedCustomer?.customerNo,
      expiryDate: formattedDate,
      items: items,
      currency: currency,
      total: items.reduce((sum, item) => sum + item.quantity * item.price, 0),
      status: "pending",
      isAccepted: false,
      isDeclined: false,
      isInvoiceSent: false,
      isDeleted: false,
    };
    setLoading(true); // Set loading to true while submitting

    axiosPublic.post(`/api/quote/${user.data._id}`, quoteInfo).then((res) => {
      setLoading(false); // Set loading to false once the response is received

      if (res.data.success) {
        toast.success("Quote added successfully.");
        reset();
        setTimeout(() => {
          navigate("/dashboard/userQuotes");
        }, 1000);
      } else {
        toast.error("Failed to create the quote.");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-start  px-4 py-8">
      <div className="w-full max-w-3xl flex flex-col gap-8 bg-white rounded-lg p-3">
        {/* Left Side: Form */}
        <div className="space-y-6">
          <GoBackButton
            loading={loading}
            navigatePath="/dashboard/userQuotes"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Create Quote
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                      className="absolute bg-white border rounded-lg shadow-lg h-auto mt-1 z-10"
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
                  Expiry Date
                </label>
                <input
                  type="date"
                  {...register("expiryDate", {
                    required: "Expiry date is required",
                  })}
                  className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                {errors.expiryDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.expiryDate.message}
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
            <div className="space-y-4 mb-4  pb-4">
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
                              className="absolute bg-white border rounded-lg shadow-lg h-auto mt-1 z-10"
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

            <div className="max-w-full flex ">
              <div className="w-1/2"></div>
              <div className="mt-6 border-t pt-4 space-y-2 w-1/2">
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

            {/* Submit Button */}
            <div className="flex items-center justify-end space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="py-2 px-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? <span>Loading...</span> : <span>Create</span>}
                <Toaster></Toaster>
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Informational Panel */}
        <div className="space-y-6 bg-blue-50 p-6 rounded-md border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-800">Help & Tips</h3>
          <p className="text-sm text-gray-600">
            Please fill out the details on the left to create a quote. You can
            search for customers and items from the available dropdowns. Once
            added, invoice items will automatically calculate the totals.
          </p>
          <p className="text-sm text-gray-600">
            Use the "Add" and "Remove" buttons to manage invoice items. Don't
            forget to set the correct expiry date to ensure the quote is valid.
          </p>
          <div className="bg-blue-100 p-4 rounded-md">
            <p className="text-sm text-blue-700">
              Tip: Ensure that all required fields are filled before submitting
              the form.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuote;
