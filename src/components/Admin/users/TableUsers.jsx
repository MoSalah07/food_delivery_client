import TbodyUsers from "./TbodyUsers";

// eslint-disable-next-line react/prop-types
export default function TableUsers({ allAccounts }) {
  return (
    <div className="container mx-auto px-1 md:px-8">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs dark:text-white uppercase bg-gray-50 dark:bg-orange-600 ">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                user name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="w-full overflow-hidden">
            {allAccounts &&
              // eslint-disable-next-line react/prop-types
              allAccounts.map((user) => (
                <TbodyUsers key={user._id} {...user} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
