// eslint-disable-next-line react/prop-types
function TbodyUsers({ email, name, role, createdAt }) {
  const date = new Date(createdAt);

  // Format the date into a readable string
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <tr className="bg-white border-b dark:bg-orange-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-orange-900">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {name}
        </th>
        <td className="px-6 py-4 text-white">{email}</td>
        <td className="px-6 py-4 text-white">{role}</td>
        <td className="px-6 py-4 text-white">{formattedDate}</td>
      </tr>
    </>
  );
}

export default TbodyUsers;
