import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import Dashboard from "./Pages/Dashboard";
import Orders from "./Pages/Orders";
import Product from "./Pages/Product";
import Reviews from "./Pages/Reviews";
import ScrollToTop from "./Components/ScrollToTop";
import Customer from "./Pages/Customer";
import FinancialManagement from "./Pages/FinancialManagement";
import Store from "./Pages/Store";
import Notification from "./Pages/Notification";
import ProfileSetting from "./Components/Store/ProfileSetting";
import StoreSetting from "./Components/Store/StoreSetting";
import PaymentSetting from "./Components/Store/PaymentSetting";
import UserSetting from "./Components/Store/UserSetting";
import NotificationSetting from "./Components/Store/NotificationSetting";
import BankSetting from "./Components/Store/BankSetting";
import Staffs from "./Pages/Staffs";
import PlanSetting from "./Components/Store/PlanSetting";
import ShippingSetting from "./Components/Store/ShippingSetting";
import DomainSetting from "./Components/Store/DomainSetting";
import Email from "./Pages/Email";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";
import ProtectRoutes from "./Components/ProtectRoutes";
import { Suspense, useEffect } from "react";
import Location from './Pages/Location'
import Branch from './Pages/Branch'
import ErrorCustomer from "./Components/ErrorElements/ErrorCustomer";
import CategoryPage from "./Pages/CategoryPage";
import ReactGA from "react-ga4";
import Cookies from "js-cookie";
import SidebarParent from "./Pages/SidebarParent";
import DomainMangaement from "./Pages/DomainMangaement";
const App = () => {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/email",
      element: <Email />,
    },
    {
      path: "/email/reset-password",
      element: <ForgotPassword />,
    },
    {
      path: "/",
      element: <SidebarParent />,
      children: [
        {
          path: "/dashboard",
          element: (
            <ProtectRoutes>
              <Dashboard />
            </ProtectRoutes>
          ),
        },
        {
          path: "/orders",
          element: (
            <ProtectRoutes>
              <Orders />
            </ProtectRoutes>
          ),
        },
        {
          path: "/product",
          element: (
            <ProtectRoutes>
              <Product />
            </ProtectRoutes>
          ),
        },
        {
          path: "/categories/:id",
          element: (
            <ProtectRoutes>
              <CategoryPage />
            </ProtectRoutes>
          ),
        },
        {
          path: "/reviews",
          element: (
            <ProtectRoutes>
              <Reviews />
            </ProtectRoutes>
          ),
        },
        {
          path: "/customer",
          element: (
            <ProtectRoutes>
              <Customer />
            </ProtectRoutes>
          ),
          errorElement: <ErrorCustomer />,
        },
        {
          path: "/financial",
          element: (
            <ProtectRoutes>
              <FinancialManagement />
            </ProtectRoutes>
          ),
        },
        {
          path: "/store",
          element: (
            <ProtectRoutes>
              <Store />
            </ProtectRoutes>
          ),
        },
        {
          path: "/notification",
          element: (
            <ProtectRoutes>
              <Notification />
            </ProtectRoutes>
          ),
        },
        {
          path: "/profilesetting",
          element: (
            <ProtectRoutes>
              <ProfileSetting />
            </ProtectRoutes>
          ),
        },
        {
          path: "/storesetting",
          element: (
            <ProtectRoutes>
              <StoreSetting />
            </ProtectRoutes>
          ),
        },
        {
          path: "/paymentsetting",
          element: (
            <ProtectRoutes>
              <PaymentSetting />
            </ProtectRoutes>
          ),
        },
        {
          path: "/usersetting",
          element: (
            <ProtectRoutes>
              <UserSetting />
            </ProtectRoutes>
          ),
        },
        {
          path: "/notificationsetting",
          element: (
            <ProtectRoutes>
              <NotificationSetting />
            </ProtectRoutes>
          ),
        },
        {
          path: "/staffs",
          element: (
            <ProtectRoutes>
              <Staffs />
            </ProtectRoutes>
          ),
        },
        {
          path: "/banksetting",
          element: (
            <ProtectRoutes>
              <BankSetting />
            </ProtectRoutes>
          ),
        },
        {
          path: "/plansetting",
          element: (
            <ProtectRoutes>
              <PlanSetting />
            </ProtectRoutes>
          ),
        },
        {
          path: "/shippingsetting",
          element: (
            <ProtectRoutes>
              <ShippingSetting />
            </ProtectRoutes>
          ),
        },
        {
          path: "/domainsetting",
          element: (
            <ProtectRoutes>
              <DomainSetting />
            </ProtectRoutes>
          ),
        },

        {
          path: "/location",
          element: (
            <ProtectRoutes>
              <Location />
            </ProtectRoutes>
          ),
        },
        {
          path: "/branch/:id",
          element: (
            <ProtectRoutes>
              <Branch/>
            </ProtectRoutes>
          ),
        },
        {
          path: "/store/domainmanagement",
          element: (
            <ProtectRoutes>
              <DomainMangaement />
            </ProtectRoutes>
          ),
        },
      ],
    },
  ]);
  ReactGA.initialize("G-LJT7FW6H2G");
  ReactGA.send({
    hitType: "pageview",
    path: window.location.pathname,
  });

  //Trigger Re Auth To Clear Local Storage And Cookies
  useEffect(() => {
    const cleared = JSON.parse(localStorage.getItem("clear"));
    console.log(cleared);
    if (cleared) {
      return;
    } else if (
      window.location.pathname === "/" ||
      window.location.pathname === "/signup"
    ) {
      return;
    } else {
      localStorage.removeItem("store");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      window.location.href = "/";
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Toaster />
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router}>
            <ScrollToTop />
          </RouterProvider>
        </Suspense>
        </main>
    </QueryClientProvider>
  );
};

export default App;
