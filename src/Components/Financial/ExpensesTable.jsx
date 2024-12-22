import { useFetchExpense } from "@/datahooks/users/expensehook";
import { format, parseISO } from "date-fns";

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
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full border-y-separate">
          <thead className="bg-[#EAF4E2]">
            <tr className="text-left bg-[#EAF4E2] shadow-lg">
              <th className="px-6 py-3 text-center font-bold text-[16px]  leading-[18.4px]  tracking-[1%] text-sm border-r text-[#333333]">
                Expense Type
              </th>
              <th className="px-6 py-3 text-center font-bold text-[16px]  leading-[18.4px]  tracking-[1%] text-sm border-r text-[#333333]">
                Amount
              </th>
              <th className="px-6 py-3 text-center font-bold text-[16px]  leading-[18.4px]  tracking-[1%] text-sm border-r text-[#333333]">
                Date
              </th>
            </tr>
          </thead>
          <tbody className=" ">
            {data ? (
              data.length > 0 ? (
                data.map((expense, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4  font-medium  text-[#6E6E6E]  leading-[18.4px] text-center ">
                      {expense.name}
                    </td>
                    <td className="px-6 py-4  font-medium  text-center text-[16px]  leading-[18.4px]  tracking-[1%] text-sm text-[#6E6E6E]">
                     &#8358;{expense.amount}
                    </td>
                    <td className="px-6 py-4  font-medium text-center text-[16px]  leading-[18.4px]  tracking-[1%] text-sm text-[#6E6E6E]">
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
    </div>
  );
};

export default ExpensesTable;
