import Sidebar from "../Components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
// import {ScrollToTop} from '../Components'
const SidebarParent = () => {
    return <>
        <Sidebar/>
        <Outlet/>
    </>
};
export default SidebarParent;