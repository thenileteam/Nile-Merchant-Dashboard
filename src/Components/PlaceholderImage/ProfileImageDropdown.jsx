import * as Popover from "@radix-ui/react-popover";
import { Info } from "lucide-react";
import ProfileImage from "./PlaceholderImage";
import Walkthrough from "../PopupModals/WalkThrough";
import { Link } from "react-router-dom";
import { logout, accountsetting, idea } from "../../assets";
import { useSubscriptionStatus } from "@/datahooks/billinghooks/subscription-manager/hook";
import { useLogOut } from "@/datahooks/users/userhooks";
import { useFetchUser } from "@/datahooks/users/userhooks";
import { getFutureDate } from "@/utils/formatdate";
export default function RadixPopover({ profilePic }) {
  const { mutate } = useLogOut();
  const {user} = useFetchUser()
  const isStoreOwner = localStorage.getItem("storeOwnerRole");
  const {
    data: subscriptionStatus,
    isLoading: subscriptionStatusLoading,
    isError: subscriptionStatusError,
  } = useSubscriptionStatus();
  const SUBSCRIPTION_END_DATE = new Date(
    subscriptionStatus?.endDate
  ).toLocaleDateString();
  return (
    <div className="flex items-center gap-4">
      {subscriptionStatus ? (
      <p>
        Expires:{" "}
          <span className="text-[13px] font-light">
            {SUBSCRIPTION_END_DATE}
          </span>
            </p>
        ) : (
            <div>
               <span className="text-green">You are on a free Trial!</span>  <br/> 
              <span className="text-[13px] font-light"> {`it will expire on the ${getFutureDate(user?.createdAt)}`}</span>
            </div>
        )}

      <Popover.Root>
        <Popover.Trigger asChild>
          <button className=" rounded-md flex items-center gap-2 transition">
            <ProfileImage profileImage={profilePic} />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className="bg-white shadow-md rounded-lg p-3 w-64 border border-gray-300 data-[state=open]:animate-fade-in"
            side="bottom"
            align="center"
          >
            {isStoreOwner ? (
              <div className="text-lightBlack font-semibold">
                <Link to="/profilesetting">
                  <button
                    type="button"
                    className="w-full flex items-center gap-1 p-2 hover:bg-zinc-100 transitions"
                  >
                    <img src={accountsetting} className="w-5" alt="settings" />
                    <span>Profile Settings</span>
                  </button>
                </Link>

                <Walkthrough />
                <button
                  type="button"
                  className="w-full flex gap-1 items-center p-2 hover:bg-zinc-100 "
                  onClick={() => mutate()}
                >
                  <img src={logout} className="w-5" alt="logout" />
                  <span className="text-red-500  ">Logout</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="w-full flex gap-1 items-center p-2 hover:bg-zinc-100 "
                onClick={() => mutate()}
              >
                <img src={logout} className="w-5" alt="logout" />
                <span className="text-red-500  ">Logout</span>
              </button>
            )}
            {/* <Popover.Close className="absolute top-2 right-2 p-1 rounded-md text-gray-600 hover:bg-gray-100">
            ✖
          </Popover.Close> */}
            <Popover.Arrow className="fill-gray-300" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
