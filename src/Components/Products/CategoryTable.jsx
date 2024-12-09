import {useState }from 'react'
import EditProduct from "../PopupModals/EditProduct";
import DeleteProduct from "../PopupModals/DeleteProduct";
const CategoryTable = ({ data }) => {
    const[count, setCount] = useState(0)
  return (
    <section className="mt-2 max-w-[800px] mx-auto">
      <table className="w-full border-separate border-spacing-y-5">
        <thead>
          <tr className="text-left bg-[#EAF4E2]">
            <th className=" p-2 shadow-lg">Category </th>
            <th className=" p-2 shadow-lg">Descriptions</th>
            <th className=" p-2 shadow-lg">Products</th>
            <th className=" p-2 shadow-lg">Actions</th>
            {/* <th className=" p-2 shadow-lg">Bulk Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => {
            return (
              <tr   className="mt-4" key={item.id}>
                    <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize lex items-center gap-2 justify-center">{item.category.name }</td>
                    <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">{item.description }</td>
                    <td className="bg-white p-2 text-[#6e6e6e] font-semibold  ">{ count} <button className="text-lightGreen font-semibold capitalize">view</button></td>
                    <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                    <EditProduct product={item} />
                    <DeleteProduct product={item} />
                    </td>
                    {/* <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                    </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default CategoryTable;
