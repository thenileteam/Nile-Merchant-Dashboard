import { useFetchExpense } from "@/datahooks/users/expensehook";
import { format, parseISO } from "date-fns";
import { UserTableListLoader } from "../CustomLoaders/loaders";

const ExpensesTable = () => {
  // Sample data - replace with your actual data source

  const { data, isFetching, isError } = useFetchExpense(
    1,
    10,
    "createdAt",
    "desc"
  );

  return (
    <div className="px-24 mt-6">

        <UserTableListLoader

          data={data}
          loading={isFetching}
          error={isError}
          cols={3}
        >
          <table className="w-full  border-separate border-spacing-y-5">
            <thead>
              <tr className="text-left bg-[#EAF4E2] shadow-lg">
              <th className="px-2 py-3 text-center font-bold   tracking-[1%] text-sm border-r text-[#333333]">
                Expense Type
              </th>
              <th className="px-2 py-3 text-center font-bold   tracking-[1%] text-sm border-r text-[#333333]">
                Amount
              </th>
              <th className="px-2 py-3 text-center font-bold   tracking-[1%] text-sm border-r text-[#333333]">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="w-full bg-transparent">
            {data ? (
              data.length > 0 ? (
                data.map((expense, index) => (
                  <tr key={index} className=" shadow-md">
                    <td className="px-2 py-3  font-bold  text-center ">
                      {expense.name}
                    </td>
                    <td className="px-2 py-3  font-bold  text-center   tracking-[1%] text-sm ">
                      {expense.amount}
                    </td>
                    <td className="px-2 py-3  font-bold  text-center   tracking-[1%] text-sm ">
                    {format(parseISO(expense.createdAt), 'MMMM d, yyyy')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    No expenses found
                  </td>
                </tr>
              )
            ) : isFetching ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  An error occurred
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  No expenses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </UserTableListLoader>
        {/* Pagination */}
        <div className="flex items-center justify-center py-4 bg-white">
          <nav className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <span className="sr-only">Previous</span>
              &lt;
            </button>
            <button className="px-3 py-1 bg-green-100 text-green-700 rounded">
              1
            </button>
            <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded">
              2
            </button>
            <span className="text-gray-500">...</span>
            <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded">
              9
            </button>
            <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded">
              10
            </button>
            <button className="p-2 text-white bg-[#004324] rounded hover:bg-[#003319]">
              <span className="sr-only">Next</span>
              &gt;
            </button>
          </nav>
        </div>

    </div>
  );
};

export default ExpensesTable;