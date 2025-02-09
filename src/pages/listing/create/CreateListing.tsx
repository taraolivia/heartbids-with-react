import React, { useState } from "react";
import { API_LISTINGS } from "../../../js/api/constants";
import { getHeaders } from "../../../js/api/headers";

interface Listing {
  title: string;
  description?: string;
  tags?: string[];
  media?: { url: string; alt: string }[];
  endsAt: string;
}

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return <p className="text-red-500">{message}</p>;
};

const CreateListingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <CreateListingForm />
    </div>
  );
};

const CreateListingForm: React.FC = () => {
  const [formData, setFormData] = useState<Listing>({
    title: "",
    description: "",
    tags: [],
    media: [{ url: "", alt: "" }],
    endsAt: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, tags: e.target.value.split(",").map((tag) => tag.trim()) });
  };

  const handleMediaChange = (index: number, field: "url" | "alt", value: string) => {
    const updatedMedia = [...(formData.media || [{ url: "", alt: "" }])];
    updatedMedia[index] = { ...updatedMedia[index], [field]: value };
    setFormData({ ...formData, media: updatedMedia });
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.title || !formData.endsAt) {
      setError("Title and end date are required.");
      return;
    }

    try {
      const response = await fetch(API_LISTINGS, {
        method: "POST",
        headers: getHeaders(), // ✅ Use imported headers function
        body: JSON.stringify(formData),
      });
      
      const responseData = await response.json();
      console.log("API Response:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to create listing.");
      }

      setSuccess(true);
      setFormData({ title: "", description: "", tags: [], media: [{ url: "", alt: "" }], endsAt: "" });
    } catch (err: unknown) {
      console.error("Error creating listing:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-4 mt-5">Create Listing</h1>
      {error && <ErrorMessage message={error} />}
      {success && <p className="text-green-500">Listing created successfully!</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block font-bold text-gray-800 mb-2">
            Title:
          </label>
          <input id="title" type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label htmlFor="description" className="block font-bold text-gray-800 mb-2">
            Description:
          </label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full p-3 border border-gray-300 rounded-md resize-none" />
        </div>
        <div>
          <label htmlFor="tags" className="block font-bold text-gray-800 mb-2">
            Tags (comma-separated):
          </label>
          <input id="tags" type="text" name="tags" onChange={handleTagChange} className="w-full p-3 border border-gray-300 rounded-md" />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Media:</h3>
          {formData.media?.map((media, index) => (
            <div key={index} className="space-y-2">
              <label htmlFor={`mediaUrl${index}`} className="block text-gray-800">
                Media URL:
              </label>
              <input id={`mediaUrl${index}`} type="url" placeholder="Media URL" value={media.url} onChange={(e) => handleMediaChange(index, "url", e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" />
              <label htmlFor={`mediaAlt${index}`} className="block text-gray-800">
                Media Alt Text:
              </label>
              <input id={`mediaAlt${index}`} type="text" placeholder="Alt Text" value={media.alt} onChange={(e) => handleMediaChange(index, "alt", e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" />
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="endsAt" className="block font-bold text-gray-800 mb-2">
            Ends At:
          </label>
          <input id="endsAt" type="datetime-local" name="endsAt" value={formData.endsAt} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md" />
        </div>
        <div className="flex justify-between items-center">
          <a href="/profile" className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900">
            Cancel
          </a>
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Create Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListingPage;
