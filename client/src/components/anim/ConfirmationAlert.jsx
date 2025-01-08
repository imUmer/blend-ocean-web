import React from "react";

const ConfirmationAlert = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Confirmation</h3>
        <p className="mb-6">{message || "Are you sure you want to proceed?"}</p>
        <div className="flex justify-end gap-4">
          <button
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-lime-500 px-4 py-2 rounded hover:bg-lime-600"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationAlert;