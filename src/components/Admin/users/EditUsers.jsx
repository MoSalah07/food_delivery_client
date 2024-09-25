import HeadingUsers from "./HeadingUsers";
import TbodyUsersEdit from "./TbodyUsersEdit";

// eslint-disable-next-line react/prop-types
function EditUsers({ allAccounts, getAllUsers }) {
  return (
    <div className="container mx-auto px-1 md:px-8">
      <HeadingUsers title={`Update User`} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-orange-600 dark:text-white">
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
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="w-full overflow-hidden">
            {allAccounts &&
              // eslint-disable-next-line react/prop-types
              allAccounts.map((user) => (
                <TbodyUsersEdit
                  key={user._id}
                  {...user}
                  getAllUsers={getAllUsers}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EditUsers;
