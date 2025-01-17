import { accountsetting, notification2 } from "../../../assets";
import { Icon1, StaffIcon, BankIcon, PlanIcon , LocationIcon} from "./StoreSettingIcons";
import StoreSettingLinkTemplate from "./StoreSettingLinkTemplate";
const StoreSettingLinks = ({
  isCollapsed,
  getLinkClasses,
  isActive,
  isDropDownOpen,
}) => {
  return (
    <>
      <div
        className={`transition-all duration-500 ease-in transform h-[120px] ${ isDropDownOpen? 'overflow-y-scroll  custom-scrollbar':''}`}
            // ${isDropDownOpen ? "opacity-100" : "opacity-0"}`}
      >
        <StoreSettingLinkTemplate
          getLinkClasses={getLinkClasses}
          isActive={isActive}
          link="/store"
          text="Store Information"
          isCollapsed={isCollapsed}
          icon={Icon1}
        />
        <StoreSettingLinkTemplate
          getLinkClasses={getLinkClasses}
          isActive={isActive}
          link="/staffs"
          text="Staff Management"
          isCollapsed={isCollapsed}
          icon={StaffIcon}
        />
        <StoreSettingLinkTemplate
          getLinkClasses={getLinkClasses}
          isActive={isActive}
          link="/banksetting"
          text="Bank Details"
          isCollapsed={isCollapsed}
          icon={BankIcon}
        />
        <StoreSettingLinkTemplate
          getLinkClasses={getLinkClasses}
          isActive={isActive}
          link="/plansetting"
          text="Plan & Billing Settings"
          isCollapsed={isCollapsed}
          icon={PlanIcon}
        />
          <StoreSettingLinkTemplate
          getLinkClasses={getLinkClasses}
          isActive={isActive}
          link="/location"
          text="Location"
          isCollapsed={isCollapsed}
          icon={LocationIcon}
        />

        {/* <Link to="/profilesetting">
          <div className="border mt-5 flex items-center gap-2 rounded-md">
            <img src={accountsetting} alt="" />
            <h1 className="text-white">Profile Settings</h1>
          </div>
        </Link>

        <Link to="/paymentsetting">
          <div className=" border mt-5 flex items-center gap-2 rounded-md">
            <img src={dollar} alt="" />
            <h1 className="text-white">Payment & Checkout Settings</h1>
          </div>
        </Link>

        <Link to="/usersetting">
          <div className=" border mt-5 flex items-center gap-2 rounded-md">
            <img src={profile} alt="" />
            <h1 className="text-white">Users & Permission Settings</h1>
          </div>
        </Link>

        <Link to="/notificationsetting">
          <div className=" border mt-5 flex items-center gap-2 rounded-md">
            <img src={notification2} alt="" />
            <h1 className="text-white">Notifications Settings</h1>
          </div>
        </Link>

        <Link to="/shippingsetting">
          <div className=" border mt-5 flex items-center gap-2 rounded-md">
            <img src={containertruck} alt="" />
            <h1 className="text-white">Shipping & Delivery Settings</h1>
          </div>
        </Link>

        <Link to="/domainsetting">
          <div className=" border mt-5 flex items-center gap-2 rounded-md">
            <img src={websecurity} alt="" />
            <h1 className="text-white">Domain Management</h1>
          </div>
        </Link> */}
        {/* <div>
          <DeleteAccount />
        </div> */}
      </div>
    </>
  );
};

export default StoreSettingLinks;
