import { useState } from "react";
import { API_LISTINGS } from "../ts/constants";
import { getHeaders } from "../ts/headers";
interface DeleteButtonProps {
    listingId: string;
    onDelete: (id: string) => void; // ✅ Pass deletion function
  }
  
  const DeleteButton: React.FC<DeleteButtonProps> = ({ listingId, onDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
  
    const handleDelete = async () => {
      setShowModal(false);
  
      try {
        const response = await fetch(`${API_LISTINGS}/${listingId}`, {
          method: "DELETE",
          headers: getHeaders(),
        });
  
        if (response.status === 204) {
          setShowToast(true);
          onDelete(listingId); // ✅ Remove listing from state
          setTimeout(() => setShowToast(false), 2000);
        } else {
          const errorData = await response.json();
          console.error("Error deleting listing:", errorData);
          alert(`Failed to delete listing: ${errorData.message || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Error deleting listing:", error);
        alert("An error occurred while deleting the listing.");
      }
    };
  
    return (
      <>
        {/* Delete Button */}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          🗑 Delete
        </button>
  
        {/* ✅ Delete Confirmation Modal */}
        {showModal && (
          <div className="modal fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="modal-content bg-gray-200 p-6 rounded-lg shadow-lg w-80 text-center">
              <h2 className="text-lg font-semibold text-gray-800">Confirm Deletion</h2>
              <p className="text-gray-600 mt-2">Are you sure you want to delete this listing?</p>
  
              <div className="flex justify-center gap-4 mt-4">
                <button
                  id="confirmDelete"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
                  onClick={handleDelete}
                >
                  Yes, Delete
                </button>
                <button
                  id="cancelDelete"
                  className="bg-gray-400 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-500 transition cursor-pointer"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* ✅ Toast Notification */}
        {showToast && (
          <div className="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md transition-opacity animate-fade">
            ✅ Listing Deleted Successfully!
          </div>
        )}
      </>
    );
  };
  
  export default DeleteButton;
  