

const AssetsSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Assets</h2>
      <p className="mb-4">
        View, edit, or delete existing Assets or add new ones.
      </p>
      <button className="bg-lime-500 px-4 py-2 rounded hover:bg-lime-600 mb-4">
        Add New Product
      </button>
      {/* Example Assets Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-3">Title</th>
            <th className="p-3">Type</th>
            <th className="p-3">Category</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Example Product */}
          <tr className="border-t border-gray-600">
            <td className="p-3">Sample Model</td>
            <td className="p-3">Model</td>
            <td className="p-3">Architecture</td>
            <td className="p-3">
              <button className="bg-lime-500 px-3 py-1 rounded hover:bg-lime-600 mr-2">
                Edit
              </button>
              <button className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AssetsSection;