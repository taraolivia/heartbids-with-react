import { useNavigate } from "react-router-dom";

interface EditButtonProps {
  listingId: string;
}

const EditButton: React.FC<EditButtonProps> = ({ listingId }) => {
  const navigate = useNavigate();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ Prevents card click from triggering
    navigate(`/listing/edit/${listingId}`); // ✅ Redirects to edit page
  };

  return (
    <button
      className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-600"
      onClick={handleEdit}
    >
      ✏️ Edit
    </button>
  );
};

export default EditButton;
