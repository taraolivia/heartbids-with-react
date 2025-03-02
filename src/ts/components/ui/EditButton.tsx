import { useNavigate } from "react-router-dom";

interface EditButtonProps {
  listingId: string;
}

const EditButton: React.FC<EditButtonProps> = ({ listingId }) => {
  const navigate = useNavigate();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/listing/edit/${listingId}`);
  };

  return (
    <button
      className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-600 cursor-pointer"
      onClick={handleEdit}
    >
      ✏️ Edit
    </button>
  );
};

export default EditButton;
