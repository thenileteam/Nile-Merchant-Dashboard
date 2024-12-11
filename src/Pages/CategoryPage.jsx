import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import { useFetchCategories } from "../datahooks/products/productshooks";
import { useFetchUser } from "../datahooks/users/userhooks";
import { arrowleft} from "../assets";
import AddProduct1 from "../Components/PopupModals/AddProduct1";
const CategoryPage = ({ newCategory, }) => {
  const { user } = useFetchUser();
  const { categories, isFetchingCategories, isError } = useFetchCategories();
  //i cant think of a cleaner way right now buh it'll come to me eventually
  const displayedCategories = newCategory
    ? [...categories, newCategory]
    : categories;
  console.log(categories);
  console.log(displayedCategories?.product);
  return (
    <>
      <Sidebar />
      <div className="flex-grow lg:ml-56 overflow-x-hidden">
      <Navbar
        title="Store"
        icon={arrowleft}
        profilePic={user && user.image ? user.image : ""}
      />
      <section className="mt-28 mb-6 max-w-[1100px] mx-auto">
        <AddProduct1/>
        <table className="w-full border-separate border-spacing-y-5">
          <thead>
            <tr className="text-left bg-[#EAF4E2]">
              <th className=" p-2 shadow-lg uppercase">product id </th>
              <th className=" p-2 shadow-lg uppercase">product name</th>
              <th className=" p-2 shadow-lg uppercase">category</th>
              <th className=" p-2 shadow-lg uppercase">price</th>
              <th className=" p-2 shadow-lg uppercase">Unit Sold</th>
            </tr>
          </thead>
            <tbody>
              {/* not sure about this yet */}
            {categories?.product?.map((item) => {
              return (
                <tr className="mt-4" key={item.id}>
                  <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize lex items-center gap-2 justify-center">
                    {item?.id}
                  </td>
                  <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                    {item?.name}
                  </td>
                  <td className="bg-white p-2 text-[#6e6e6e] font-semibold  "></td>
                  <td className="bg-white p-2 text-[#6e6e6e] font-semibold  ">
                    {item?.price}
                  </td>
                  <td className="bg-white p-2   text-[#6e6e6e]  font-semibold capitalize">
                    {item?.stock}
                  </td>
                  {/* <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                    </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      </div>
    </>
  );
};

export default CategoryPage;
