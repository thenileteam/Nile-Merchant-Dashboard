/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { preference1 } from "../../assets";
// import ShippingConfirm from "../PopupModals/ShippingConfirm";
import { format, parseISO } from "date-fns";
import { FaEllipsisH } from "react-icons/fa";
import { UseGenerateInvoiceGenerator } from "../../utils/generateInvoice";
import { useFetchUser } from "../../datahooks/users/userhooks";
import InvoicePreview from "./InvoicePreview";
import { FaX } from "react-icons/fa6";
import InvoiceComponent from "./invoiceComponent";
import Pagination from "../Pagination/Pagination";
import usePagination from "../Pagination/PaginationHook";

const OrdersTable = ({ data, isCollapsed }) => {
  const [displayDropDown, setDisplayDropDown] = useState({
    id: null,
    active: false,
  });
  const [previewView, setPreviewView] = useState({
    url: "",
    display: false,
  });
  const [order, setOrder] = useState(null);
  const { user} = useFetchUser();
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const itemsPerPage = 10;
  const { pageCount, currentItems, handlePageChange } = usePagination(
    data,
    itemsPerPage
  );
  // console.log(data);
  const handleInvoice = (order) => {
    setOrder(order);
    const { url } = UseGenerateInvoiceGenerator(order, user);
    // console.log(url);
    setPreviewView({
      url,
      display: true,
    });
  };

  const ellipsisRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ellipsisRef.current && !ellipsisRef.current.contains(event.target)) {
        setDisplayDropDown({
          id: null,
          active: false,
        }); // Close the list when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // const handleInvoice = (order) => {
  //   console.log(order)
  // }
  // 6fwrI8EmItlIXpT5
  const toggleFilterDropdown = () => {
    setFilterDropdownOpen(!filterDropdownOpen);
  };

  const handleFilterClick = (text) => {
    // Close the dropdown and show the popup with the selected text
    setFilterDropdownOpen(false);
    setSelectedText(text);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedText("");
  };
  return (
    <>
      {previewView.display && previewView.url && (
        <div className=" fixed grid z-[3000000] place-items-center w-full h-screen left-0 right-0 bottom-0 top-0">
          <div
            onClick={() => {
              //clear state of visibility et al
              setPreviewView({
                url: "",
                display: false,
              });
              setDisplayDropDown({
                id: null,
                active: false,
              });
            }}
            className="absolute top-0 left-0 w-full bg-black bg-opacity-60  h-full blur-sm"
          ></div>
          <div
            onClick={() => {
              //clear state of visibility et al
              setPreviewView({
                url: "",
                display: false,
              });
              setDisplayDropDown({
                id: null,
                active: false,
              });
            }}
            className=" absolute z-[3000001] top-4 right-6 bg-red-300 cursor-pointer size-10 rounded-full grid place-items-center"
          >
            <FaX className=" " size={15} color="white" />
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className=" relative h-[86%] w-[80%]"
          >
            {/* <InvoicePreview pdfUrl={previewView.url}/> */}
            <InvoiceComponent user={user} data={order} />
          </div>
        </div>
      )}
      
      {/* Tables */}
      <div className={`${isCollapsed?'max-w-[1110px]':'max-w-[950px]'}  text-lightBlack h-fit mx-auto bg-white rounded-md shadow-md p-4 border-[0.5px]`}>
        <table className="w-full border-separate  h-fit border-spacing-y-4">
          <thead>
            <tr className="text-left bg-[#EAF4E2] shadow-lg ">
              <th className="p-3 text-[14px] text-center">Order ID</th>
              <th className="p-3 text-[14px]">Customer Name</th>
              <th className="p-3 text-[14px] text-center">Product Name</th>
              <th className="p-3 text-[14px] text-center">Price</th>
              {/* <th className="p-3 text-[14px] text-center">
                Total P. With Shipping
              </th> */}
              <th className="p-3 text-[14px] text-center">Order Date</th>
              <th className="p-3 text-[14px] text-center">Shipping Status</th>
              <th className="p-3 text-[14px]  text-center">Track Order</th>
              <th className="p-3 text-[14px] text-center">Payment Status</th>
              <th className="p-3 text-[14px]   text-center">Actions</th>
                {/* <span className="">pay</span> */} 
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((order) => (
              <tr key={order.id} className="bg-[#ffffff] h-[60px] shadow-md">
                  <td className="px-2 font-bold bg-[#EAF4E2] text-center text-[13px]">{String(order.id).padStart(4, 0)}</td>
                <td className="px-2  text-[13px] text-center text-[#6e6e6e]">
                  {order?.customer?.name ||
                    order?.customer?.id.slice(0, 2) ||
                    "Unassigned"}
                </td>
                <td className="px-2  text-center text-[13px] text-[#6e6e6e]">
                  {order.items[0].name}
                </td>
                <td className="px-2  text-center text-[13px] text-[#6e6e6e]">&#8358;
                  {order.items[0].price}
                </td>
                {/* <td className="px-2  text-center text-[13px]">
                  &#8358;{order.totalAmount}
                </td> */}
                <td className="px-2 text-center text-[13px] text-[#6e6e6e]">
                  {format(parseISO(order?.createdAt), "dd/MM/yyyy")}
                </td>
                <td className="px-2  text-center text-[13px] text-[#6e6e6e]">
                  {order.status}
                </td>
                <td className="px-2 text-center text-[13px] text-[#6e6e6e]">N/A</td>
                <td className="px-2 text-center text-[13px] text-[#6e6e6e]">
                  {order.paymentStatus || "Pending"}
                </td>
                <td >
                  <div className=" relative">
                    <FaEllipsisH  
                      onClick={() =>
                        setDisplayDropDown({
                          ...displayDropDown,
                          id: order.id,
                          active: !displayDropDown.active,
                        })
                      }
                      ref={ellipsisRef}
                      className=" cursor-pointer text-lightGreen mx-auto block"
                    />
                    {displayDropDown.id === order.id &&
                      displayDropDown.active && (
                        <div className=" absolute p-3 w-fit z-[100000] shadow-lg shadow-zinc-300 right-full top-[140%] rounded-md bg-white ">
                          <p
                            onClick={() => handleInvoice(order)}
                            className=" hover:bg-zinc-200 py-2  cursor-pointer w-fit text-nowrap px-3"
                          >
                            Preview Order Invoice
                          </p>
                        </div>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*Pagination*/}
      {data?.length>itemsPerPage&&<Pagination pageCount={pageCount} onPageChange={handlePageChange}/>}

      {/* Export CSV Button */}
      {/* <div className=" flex px-28 justify-end mt-10">
        <h1 className="text-[#ffffff] flex font-bold gap-1 items-center bg-[#004324] p-2.5 rounded-md">
          <img src={download} alt="" />
          Export CSV
        </h1>
      </div> */}
    </>
  );
};

export default OrdersTable;
