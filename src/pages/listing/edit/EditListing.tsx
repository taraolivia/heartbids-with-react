import React, { useState, useRef, useEffect } from "react";
import { API_LISTINGS } from "../../../ts/constants";
import { getHeaders } from "../../../ts/headers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ErrorMessage from "../../../components/ErrorMessage";

interface Listing {
  title: string;
  description?: string;
  tags?: string[];
  media?: { url: string; alt: string }[];
  endsAt: string;
}

const EditListingPage: React.FC<{ listingId: string }> = ({ listingId }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <EditListingForm listingId={listingId} />
    </div>
  );
};

const EditListingForm: React.FC<{ listingId: string }> = ({ listingId }) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const tagsRef = useRef<HTMLInputElement | null>(null);
  const endsAtRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState<Listing>({
    title: "",
    description: "",
    tags: [],
    media: [{ url: "", alt: "" }],
    endsAt: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch existing listing data
  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_LISTINGS}/${listingId}`, {
          headers: getHeaders(),
        });
  
        if (!response.ok) throw new Error("Failed to fetch listing.");
        
        const responseData = await response.json();
        const data = responseData.data; // ✅ Fix: Extract the correct data object
  

  
        setFormData({
          title: data.title || "",
          description: data.description || "",
          tags: Array.isArray(data.tags) ? [...data.tags] : [], // ✅ Fix: Spread to avoid mutations
          media: data.media && data.media.length > 0 ? data.media : [{ url: "", alt: "" }],
          endsAt: data.endsAt || "",
        });
  
      } catch (error) {
        console.error("❌ Error fetching listing:", error);
        setError("Failed to load listing data.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchListing();
  }, [listingId]);
  
  
  // Debug: Log whenever formData updates
  useEffect(() => {

  }, [formData]);
  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userTags = e.target.value.split(",").map((tag) => tag.trim());
    setFormData({ ...formData, tags: userTags });
  };

  const handleMediaChange = (index: number, field: "url" | "alt", value: string) => {
    const updatedMedia = [...(formData.media || [{ url: "", alt: "" }])];
    updatedMedia[index] = { ...updatedMedia[index], [field]: value };
    setFormData({ ...formData, media: updatedMedia });
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData({ ...formData, endsAt: date.toISOString() });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setErrorField({});
    setSuccess(false);
    setLoading(true);

    let firstErrorField: HTMLElement | null = null;
    const newErrorFields: Record<string, boolean> = {};
    const errorMessages: string[] = [];

    const cleanedTags = (formData.tags ?? []).map((tag) => tag.trim()).filter((tag) => tag.length > 0);
    if (!cleanedTags.includes("HeartBids")) {
      cleanedTags.push("HeartBids");
    }

    if (!formData.title.trim()) {
      newErrorFields.title = true;
      errorMessages.push("A title is required.");
      if (!firstErrorField) firstErrorField = titleRef.current;
    }
    if (!formData.description?.trim()) {
      newErrorFields.description = true;
      errorMessages.push("A description is required.");
      if (!firstErrorField) firstErrorField = descriptionRef.current;
    }
    if (!formData.endsAt) {
      newErrorFields.endsAt = true;
      errorMessages.push("You must select an auction end date.");
      if (!firstErrorField) firstErrorField = endsAtRef.current;
    }
    if (!formData.media?.[0]?.url.trim()) {
      newErrorFields.media = true;
      errorMessages.push("An image URL is required.");
    }
    if (!formData.media?.[0]?.alt.trim()) {
      newErrorFields.media = true;
      errorMessages.push("Alt text is required.");
    }

    setErrorField(newErrorFields);
    setError(errorMessages.join("\n"));

    if (Object.keys(newErrorFields).length > 0) {
      setLoading(false);
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
        firstErrorField.focus();
      }
      return;
    }

    try {
      const response = await fetch(`${API_LISTINGS}/${listingId}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ ...formData, tags: cleanedTags }),
      });
    
      if (!response.ok) {
        const errorData = await response.json(); // ✅ Try to get API error details
        console.error("❌ Update failed:", errorData); // ✅ Log detailed error
    
        throw new Error(errorData.message || "Failed to update listing.");
      }
    
      setSuccess(true);
    } catch (error) {
      console.error("❌ Error updating listing:", error); // ✅ Log the actual error
      setError(error instanceof Error ? error.message : "Unknown error occurred.");
    } finally {
      setLoading(false);
    }    
  };

  return (
    <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-4 pt-22">Edit Listing</h1>
      <div>
        <p>All fields are required to create a listing on HeartBids. This ensures that the buyers know what they are bidding on and creates a safe experience for everyone.</p>
      </div>
      {error && <ErrorMessage message={error} />}
      {success && <p className="text-green-500">Listing edited successfully!</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block font-bold text-gray-800 mb-2">
            Title:
          </label>
          <input id="title" ref={titleRef} type="text" name="title" value={formData.title} onChange={handleChange} required className={`w-full p-3 border rounded-md ${errorField.title ? "border-red-500" : "border-gray-300"}`} />
        </div>
        <div>
          <label htmlFor="description" className="block font-bold text-gray-800 mb-2">
            Description:
          </label>
          <textarea id="description" ref={descriptionRef} name="description" value={formData.description} onChange={handleChange} rows={4} className={`w-full p-3 border rounded-md ${errorField.description ? "border-red-500" : "border-gray-300"}`} />
        </div>
        <div>
          <label htmlFor="tags" className="block font-bold text-gray-800 mb-2">
            Tags (comma-separated):
          </label>
          <input id="tags" ref={tagsRef} type="text" name="tags" onChange={handleTagChange} value={formData.tags ? formData.tags.join(", ") : ""} className={`w-full p-3 border rounded-md ${errorField.tags ? "border-red-500" : "border-gray-300"}`} />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Media:</h3>
          {formData.media?.map((media, index) => (
            <div key={index} className="space-y-2">
              <label htmlFor={`mediaUrl${index}`} className="block text-gray-800">
                Media URL:
              </label>
              <input id={`mediaUrl${index}`} type="url" placeholder="Media URL" value={formData.media?.[0]?.url || ""} onChange={(e) => handleMediaChange(0, "url", e.target.value)} className={`w-full p-3 border rounded-md ${errorField.media ? "border-red-500" : "border-gray-300"}`} />
              <label htmlFor={`mediaAlt${index}`} className="block text-gray-800">
                Media Alt Text:
              </label>
              <input id={`mediaAlt${index}`} type="text" placeholder="Alt Text" value={media.alt} onChange={(e) => handleMediaChange(index, "alt", e.target.value)} className={`w-full p-3 border rounded-md ${errorField.media ? "border-red-500" : "border-gray-300"}`} />
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          <label htmlFor="endsAt" className="font-medium text-gray-700 mb-1">
            Ends At <span className="text-red-500">*</span>
          </label>
          <div ref={endsAtRef}>
            <DatePicker selected={formData.endsAt ? new Date(formData.endsAt) : null} onChange={handleDateChange} showTimeSelect dateFormat="MMMM d, yyyy h:mm aa" minDate={new Date()} timeIntervals={15} className={`w-full p-3 border rounded-md ${errorField.endsAt ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`} wrapperClassName="w-full" />
          </div>

          <p className="text-sm text-gray-500 mt-1">Select a date & time easily.</p>
        </div>

        <div className="flex justify-between items-center">
          <a href="/profile" className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900">
            Cancel
          </a>
          <button type="submit" disabled={loading} className={`mt-4 p-3 rounded-md font-semibold text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}>
            {loading ? "Updating..." : "Update Listing"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditListingPage;
