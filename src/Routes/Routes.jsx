import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Dashboard from "../Pages/Layout/Dashboard/Dashboard";
import AddCustomer from "../Pages/Layout/DashboardPages/Customers/addCustomer";
import Customers from "../Pages/Layout/DashboardPages/Customers/Customers";
import EditCustomer from "../Pages/Layout/DashboardPages/Customers/EditCustomer";
import DashboardHome from "../Pages/Layout/DashboardPages/DashboardHome/DashboardHome";
import AddExpense from "../Pages/Layout/DashboardPages/Expenses/AddExpense";
import EditExpense from "../Pages/Layout/DashboardPages/Expenses/EditExpense";
import Expenses from "../Pages/Layout/DashboardPages/Expenses/Expenses";
import AddInvoice from "../Pages/Layout/DashboardPages/Invoices/AddInvoice";
import EditInvoice from "../Pages/Layout/DashboardPages/Invoices/EditInvoice";
import Invoices from "../Pages/Layout/DashboardPages/Invoices/Invoices";
import AddItem from "../Pages/Layout/DashboardPages/Items/AddItem";
import EditItem from "../Pages/Layout/DashboardPages/Items/EditItem";
import Items from "../Pages/Layout/DashboardPages/Items/Items";
import AddQuote from "../Pages/Layout/DashboardPages/Quotes/AddQuote";
import EditQuote from "../Pages/Layout/DashboardPages/Quotes/EditQuote";
import Quotes from "../Pages/Layout/DashboardPages/Quotes/Quotes";
import Login from "../Pages/Login/Login";
import Main from "../Pages/Main/Main";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";

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
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Register></Register>,
      },
    ],
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
        path: "dashboardHome",
        element: <DashboardHome></DashboardHome>,
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
          fetch(`http://localhost:5000/api/users/${params.email}`),
      },
      {
        path: "addItem/:email",
        element: <AddItem></AddItem>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/api/users/${params.email}`),
      },
      {
        path: "addQuote/:email",
        element: <AddQuote></AddQuote>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/api/users/${params.email}`),
      },
      {
        path: "addInvoice/:email",
        element: <AddInvoice></AddInvoice>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/api/users/${params.email}`),
      },
      {
        path: "addExpense/:email",
        element: <AddExpense></AddExpense>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/api/users/${params.email}`),
      },
      {
        path: "editCustomerDetails/:id",
        element: <EditCustomer></EditCustomer>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/api/customer/${params.id}`),
      },
      {
        path: "editItemDetails/:id",
        element: <EditItem></EditItem>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/api/item/${params.id}`),
      },
      {
        path: "editQuoteDetails/:id",
        element: <EditQuote></EditQuote>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/api/quote/${params.id}`),
      },
      {
        path: "editInvoiceDetails/:id",
        element: <EditInvoice></EditInvoice>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/api/invoice/${params.id}`),
      },
      {
        path: "editExpenseDetails/:id",
        element: <EditExpense></EditExpense>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/api/expense/${params.id}`),
      },
    ],
  },
]);
export default router;
