import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";

const CustomerCheckoutPage = () => {
  const { handleSubmit, control, reset } = useForm();
  const invoice = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  console.log(invoice);

  const onSubmit = (data) => {
    alert("Payment processed successfully!");
    console.log("Payment Details:", data);
    reset();
    const paymentInfo = {
      total: invoice.data.total,
      currency: invoice.data.currency,
      userId: invoice.data.userId,
    };
    console.log(paymentInfo);

    axiosPublic.post(`/api/sslPayment`, paymentInfo).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        const redirectUrl = res.data.paymentUrl;
        if (redirectUrl) {
          window.location.replace(redirectUrl);
        }
        toast.success("Payment is successfull.");
        reset();
        // setTimeout(() => {
        //   navigate("/customerDashboard/userInvoices");
        // }, 1000);
      } else {
        toast.error("Failed to pay.");
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Complete Your Payment
        </h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Please fill in the form below to complete your secure payment.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Controller
            name="name"
            control={control}
            defaultValue=""
            // rules={{ required: "Full Name is required" }}
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  {...field}
                  className={`mt-1 block w-full rounded-md border ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  } p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200`}
                  placeholder="Enter your full name"
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              //   required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            }}
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  {...field}
                  type="email"
                  className={`mt-1 block w-full rounded-md border ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  } p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200`}
                  placeholder="Enter your email address"
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="cardNumber"
            control={control}
            defaultValue=""
            // rules={{ required: "Card Number is required" }}
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  {...field}
                  className={`mt-1 block w-full rounded-md border ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  } p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200`}
                  placeholder="1234 5678 9012 3456"
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
          <div className="flex space-x-4">
            <Controller
              name="expiryDate"
              control={control}
              defaultValue=""
              //   rules={{ required: "Expiry Date is required" }}
              render={({ field, fieldState }) => (
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    {...field}
                    className={`mt-1 block w-full rounded-md border ${
                      fieldState.error ? "border-red-500" : "border-gray-300"
                    } p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200`}
                    placeholder="MM/YY"
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="cvv"
              control={control}
              defaultValue=""
              //   rules={{ required: "CVV is required" }}
              render={({ field, fieldState }) => (
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <input
                    {...field}
                    className={`mt-1 block w-full rounded-md border ${
                      fieldState.error ? "border-red-500" : "border-gray-300"
                    } p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200`}
                    placeholder="123"
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <Controller
            name="saveCard"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <div className="flex items-center">
                <input
                  {...field}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Save this card for future payments
                </label>
              </div>
            )}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Pay Now
          </button>
          <Toaster></Toaster>
        </form>
      </div>
    </div>
  );
};

export default CustomerCheckoutPage;
