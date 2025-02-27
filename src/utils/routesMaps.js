import { DashboardIcon, ProductIcon, OrderIcon, CustomerIcon, FinancialIcon } from '../Components/Sidebar/SidebarIcons'
// const roleToRouteMap = {
//     "order manager": "/order",
//     "product manager": "/product",
//     "customer manager": "/customer",
//     "financial manager": "/financial",
//   };
  
//   // Function to get the route by role
//   export const getRouteByRole = (roleName) => {
//     return roleToRouteMap[roleName?.toLowerCase()] || "/";
//   };

  // sidebarlinks
export const sidebarLinks = [
  { name: "Dashboard Overview", path: "/dashboard", icon: DashboardIcon },
  { name: "Order", path: "/order", icon: OrderIcon },
  { name: "Product", path: "/product", icon: ProductIcon },
  { name: "Customer management", path: "/customer", icon: CustomerIcon },
  { name: "Transaction", path: "/financial", icon: FinancialIcon },
];
  
  