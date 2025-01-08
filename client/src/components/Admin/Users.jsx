
const UsersSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <p className="mb-4">View, edit, or remove users from the platform.</p>
      {/* Example Table for Users */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Example User */}
          <tr className="border-t border-gray-600">
            <td className="p-3">John Doe</td>
            <td className="p-3">john@example.com</td>
            <td className="p-3">Admin</td>
            <td className="p-3">
              <button className="bg-lime-500 px-3 py-1 rounded hover:bg-lime-600 mr-2">
                Edit
              </button>
              <button className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UsersSection;