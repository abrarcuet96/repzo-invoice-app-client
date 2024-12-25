import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import CancelPayment from "../Pages/Layout/Dashboard/CustomerDashboard/CustomerCheckoutPage/CancelPayment";
import FailedPayment from "../Pages/Layout/Dashboard/CustomerDashboard/CustomerCheckoutPage/FailedPayment";
import SuccessPayment from "../Pages/Layout/Dashboard/CustomerDashboard/CustomerCheckoutPage/SuccessPayment";
import CustomerDashboard from "../Pages/Layout/Dashboard/CustomerDashboard/CustomerDashboard";
import CustomerHome from "../Pages/Layout/Dashboard/CustomerDashboard/CustomerHome/CustomerHome";
import UpdateCustomerProfile from "../Pages/Layout/Dashboard/CustomerDashboard/CustomerHome/UpdateCustomerProfile";
import CustomerInvoices from "../Pages/Layout/Dashboard/CustomerDashboard/CustomerInvoices/CustomerInvoices";
import CustomerQuotes from "../Pages/Layout/Dashboard/CustomerDashboard/CustomerQuotes/CustomerQuotes";
import CustomerUser from "../Pages/Layout/Dashboard/CustomerDashboard/CustomerUser/CustomerUser";
import Dashboard from "../Pages/Layout/Dashboard/Dashboard";
import AddCustomer from "../Pages/Layout/DashboardPages/Customers/addCustomer";
import Customers from "../Pages/Layout/DashboardPages/Customers/Customers";
import EditCustomer from "../Pages/Layout/DashboardPages/Customers/EditCustomer";
import DashboardHome from "../Pages/Layout/DashboardPages/DashboardHome/DashboardHome";
import AddExpense from "../Pages/Layout/DashboardPages/Expenses/AddExpense";
import EditExpense from "../Pages/Layout/DashboardPages/Expenses/EditExpense";
import Expenses from "../Pages/Layout/DashboardPages/Expenses/Expenses";
import CustomerInvoicePage from "../Pages/Layout/DashboardPages/InvoicePage/CustomerInvoicePage";
import InvoicePage from "../Pages/Layout/DashboardPages/InvoicePage/InvoicePage";
import AddInvoice from "../Pages/Layout/DashboardPages/Invoices/AddInvoice";
import EditInvoice from "../Pages/Layout/DashboardPages/Invoices/EditInvoice";
import Invoices from "../Pages/Layout/DashboardPages/Invoices/Invoices";
import AddItem from "../Pages/Layout/DashboardPages/Items/AddItem";
import EditItem from "../Pages/Layout/DashboardPages/Items/EditItem";
import Items from "../Pages/Layout/DashboardPages/Items/Items";
import PdfViewer from "../Pages/Layout/DashboardPages/PDFViewer/PDFViewer";
import AddQuote from "../Pages/Layout/DashboardPages/Quotes/AddQuote";
import EditQuote from "../Pages/Layout/DashboardPages/Quotes/EditQuote";
import Quotes from "../Pages/Layout/DashboardPages/Quotes/Quotes";
import TrackPage from "../Pages/Layout/DashboardPages/TrackPage/TrackPage";
import CreateUserProfile from "../Pages/Layout/DashboardPages/UserProfile/CretaeUserProfile";
import UpdateUserProfile from "../Pages/Layout/DashboardPages/UserProfile/UpdateUserProfile";
import UserProfile from "../Pages/Layout/DashboardPages/UserProfile/UserProfile";
import Login from "../Pages/Login/Login";
import Main from "../Pages/Main/Main";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import AboutUs from "./../Pages/AboutUs/AboutUs.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Register></Register>,
  },
  {
    path: "/success",
    element: <SuccessPayment></SuccessPayment>,
  },
  {
    path: "/fail",
    element: <FailedPayment></FailedPayment>,
  },
  {
    path: "/cancel",
    element: <CancelPayment></CancelPayment>,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "userProfile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "updateUserProfile/:profileId",
        element: <UpdateUserProfile></UpdateUserProfile>,
        loader: ({ params }) =>
          fetch(`https://repzo-backend.vercel.app/api/quote/${params.id}`),
      },

      {
        path: "createUserProfile",
        element: <CreateUserProfile></CreateUserProfile>,
      },
      {
        path: "dashboardHome",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "userHome",
        element: <TrackPage></TrackPage>,
      },
      {
        path: "pdfViewer",
        element: <PdfViewer></PdfViewer>,
      },
      {
        path: "invoicePage/:id",
        element: <InvoicePage></InvoicePage>,
        loader: ({ params }) =>
          fetch(`https://repzo-backend.vercel.app/api/quote/${params.id}`),
      },

      {
        path: "userCustomers",
        element: <Customers></Customers>,
      },
      {
        path: "userItems",
        element: <Items></Items>,
      },
      {
        path: "userQuotes",
        element: <Quotes></Quotes>,
      },
      {
        path: "userInvoices",
        element: <Invoices></Invoices>,
      },
      {
        path: "userExpenses",
        element: <Expenses></Expenses>,
      },
      {
        path: "addCustomer/:email",
        element: <AddCustomer></AddCustomer>,
        loader: ({ params }) =>
          fetch(`https://repzo-backend.vercel.app/api/users/${params.email}`),
      },
      {
        path: "addItem/:email",
        element: <AddItem></AddItem>,
        loader: ({ params }) =>
          fetch(`https://repzo-backend.vercel.app/api/users/${params.email}`),
      },
      {
        path: "addQuote/:email",
        element: <AddQuote></AddQuote>,
        loader: ({ params }) =>
          fetch(`https://repzo-backend.vercel.app/api/users/${params.email}`),
      },
      {
        path: "addInvoice/:email",
        element: <AddInvoice></AddInvoice>,
        loader: ({ params }) =>
          fetch(`https://repzo-backend.vercel.app/api/users/${params.email}`),
      },
      {
        path: "addExpense/:email",
        element: <AddExpense></AddExpense>,
        loader: ({ params }) =>
          fetch(`https://repzo-backend.vercel.app/api/users/${params.email}`),
      },
      {
        path: "editCustomerDetails/:id",
        element: <EditCustomer></EditCustomer>,
        loader: ({ params }) =>
          fetch(`https://repzo-backend.vercel.app/api/customer/${params.id}`),
      },
      {
        path: "editItemDetails/:id",
        element: <EditItem></EditItem>,
        loader: ({ params }) =>
          fetch(`https://repzo-backend.vercel.app/api/item/${params.id}`),
      },
      {
        path: "editQuoteDetails/:id",
        element: <EditQuote></EditQuote>,
        loader: ({ params }) =>
          fetch(`https://repzo-backend.vercel.app/api/quote/${params.id}`),
      },
      {
        path: "editInvoiceDetails/:id",
        element: <EditInvoice></EditInvoice>,
        loader: ({ params }) =>
          fetch(`https://repzo-backend.vercel.app/api/invoice/${params.id}`),
      },
      {
        path: "editExpenseDetails/:id",
        element: <EditExpense></EditExpense>,
        loader: ({ params }) =>
          fetch(`https://repzo-backend.vercel.app/api/expense/${params.id}`),
      },
    ],
  },
  {
    path: "customerDashboard",
    element: (
      <PrivateRoute>
        <CustomerDashboard></CustomerDashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "customerHome",
        element: <CustomerHome></CustomerHome>,
      },
      {
        path: "updateCustomerProfile/:profileId",
        element: <UpdateCustomerProfile></UpdateCustomerProfile>,
        loader: ({ params }) =>
          fetch(`https://repzo-backend.vercel.app/api/quote/${params.id}`),
      },
      {
        path: "customerInvoicePage/:id",
        element: <CustomerInvoicePage></CustomerInvoicePage>,
        loader: ({ params }) =>
          fetch(`https://repzo-backend.vercel.app/api/invoice/${params.id}`),
      },
      {
        path: "customerQuotes/:email",
        element: <CustomerQuotes></CustomerQuotes>,
        loader: ({ params }) =>
          fetch(
            `https://repzo-backend.vercel.app/api/customerUser/${params.email}`
          ),
      },
      {
        path: "customerInvoices/:email",
        element: <CustomerInvoices></CustomerInvoices>,
        loader: ({ params }) =>
          fetch(
            `https://repzo-backend.vercel.app/api/customerUser/${params.email}`
          ),
      },
      {
        path: "customerUser/:email",
        element: <CustomerUser></CustomerUser>,
        loader: ({ params }) =>
          fetch(
            `https://repzo-backend.vercel.app/api/customerUser/${params.email}`
          ),
      },
    ],
  },
]);
export default router;
