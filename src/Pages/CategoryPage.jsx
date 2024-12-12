import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import { useFetchCategories } from "../datahooks/products/productshooks";
import { useFetchUser } from "../datahooks/users/userhooks";
import { arrowleft } from "../assets";
import AddProduct1 from "../Components/PopupModals/AddProduct1";
import { useParams } from "react-router-dom";
const CategoryPage = ({ newCategory }) => {
  const { user } = useFetchUser();
  const { categories, isFetchingCategories, isError } = useFetchCategories();
  const { id } = useParams();
  const { name } = categories[id]
  //capitalize the title of each store name pls do not touch abeg!
  const storeTitle = name.split('')[0].toUpperCase() + name.slice(1);
  return (
    <>
      <Sidebar />
      <div className="flex-grow lg:ml-56 overflow-x-hidden">
        <Navbar
          title={storeTitle}
          icon={arrowleft}
          profilePic={user && user.image ? user.image : ""}
        />
        <section className="mt-28 mb-6 max-w-[800px] mx-auto">
          <AddProduct1 />
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
              {
                //in the above array look for a particular category based on its id and map thru it
                categories?.[id]?.products.map((item) => {
                  return (
                    <tr className="mt-4 bg-white shadow-md" key={item.id}>
                      <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize ">
                        {item.id}
                      </td>
                      <td className="bg-white p-2 text-[#6e6e6e] font-semibold  ">
                        {item.name}
                      </td>
                      <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                        {name}
                      </td>
                      <td className="bg-white p-2 text-[#6e6e6e] font-semibold  ">
                        {item.price}
                      </td>
                      <td className="bg-white p-2   text-[#6e6e6e]  font-semibold capitalize">
                        {item.stock}
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default CategoryPage;
