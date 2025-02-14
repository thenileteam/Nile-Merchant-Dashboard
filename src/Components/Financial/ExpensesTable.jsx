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
    <div className={`mt-6 bg-white rounded-md shadow-md p-4 text-lightBlack border-[0.5px]`}>
        <UserTableListLoader
          data={data}
          loading={isFetching}
          error={isError}
          cols={3}
        >
          <table className="w-full border-separate border-spacing-y-4">
            <thead>
            <tr className="text-left bg-[#EAF4E2] shadow-lg">
            <th className="p-3 text-center font-bold tracking-[1%] text-sm border-r text-[#333]">
                Expense ID
              </th>
              <th className="p-3 text-center font-bold tracking-[1%] text-sm border-r text-[#333]">
                Expense Type
              </th>
              <th className="p-3 text-center font-bold tracking-[1%] text-sm border-r text-[#333]">
                Amount
              </th>
              <th className="p-3 text-center font-bold tracking-[1%] text-sm border-r text-[#333]">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="w-full bg-transparent">
            {data ? (
              data.length > 0 ? (
                data.map((expense, index) => (
                  <tr key={index} className=" shadow-md">
                    <td className="p-3 font-bold text-center bg-[#EAF4E2]">
                      {String(index).padStart(4, 0)}
                    </td>
                    <td className="p-3 font-bold text-center text-[#6e6e6e]">
                      {expense.name}
                    </td>
                    <td className="p-3 font-bold text-center tracking-[1%] text-sm text-[#6e6e6e]">
                      &#8358;{expense.amount}
                    </td>
                    <td className="p-3 font-bold text-center tracking-[1%] text-sm text-[#6e6e6e]">
                    {format(parseISO(expense.createdAt), 'dd/MM/yyyy')}
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
    </div>
  );
};

export default ExpensesTable;
