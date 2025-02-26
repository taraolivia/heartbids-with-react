import React, { useState, useRef, useEffect } from "react";
import { API_LISTINGS } from "../../../config/constants";
import { getHeaders } from "../../../config/headers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ErrorMessage from "../../../components/ui/ErrorMessage";

interface Listing {
  title: string;
  description?: string;
  tags?: string[];
  media?: { url: string; alt: string }[];
  endsAt: string;
}

const CreateListingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <CreateListingForm />
    </div>
  );
};

const CreateListingForm: React.FC = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const tagsRef = useRef<HTMLInputElement | null>(null);
  const endsAtRef = useRef<HTMLDivElement | null>(null); // ✅ Use div, NOT DatePicker

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

  useEffect(() => {
    const firstErrorKey = Object.keys(errorField).find((key) => errorField[key]); // ✅ Find first error field
    if (firstErrorKey) {
      const field = document.getElementById(firstErrorKey);
      if (field && "scrollIntoView" in field && "focus" in field) {
        field.scrollIntoView({ behavior: "smooth", block: "center" });
        (field as HTMLInputElement | HTMLTextAreaElement).focus();
      }
    }
  }, [errorField]);

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
    console.log("Submitting form...", formData); // ✅ Debugging step

    setError(null);
    setErrorField({});
    setSuccess(false);
    setLoading(true);

    let firstErrorField: HTMLElement | null = null;
    const newErrorFields: Record<string, boolean> = {};
    const errorMessages: string[] = [];

    // ✅ Trim and clean user input
    const cleanedTags = (formData.tags ?? []).map((tag) => tag.trim()).filter((tag) => tag.length > 0);

    if (!cleanedTags.includes("HeartBids")) {
      cleanedTags.push("HeartBids");
    }

    // ✅ Required fields validation (User-defined mandatory fields)
    if (!formData.title.trim()) {
      newErrorFields.title = true;
      errorMessages.push("A title is required to create a listing.");
      if (!firstErrorField) firstErrorField = titleRef.current;
    }
    if (!formData.description?.trim()) {
      newErrorFields.description = true;
      errorMessages.push("A description is required so others know what you're selling.");
      if (!firstErrorField) firstErrorField = descriptionRef.current;
    }
    if (!formData.endsAt) {
      newErrorFields.endsAt = true;
      errorMessages.push("You must select an auction end date.");
      if (!firstErrorField) firstErrorField = endsAtRef.current;
    }
    if (cleanedTags.length === 0) {
      newErrorFields.tags = true;
      errorMessages.push("Please add at least one tag to categorize your listing.");
      if (!firstErrorField) firstErrorField = tagsRef.current;
    }
    if (!formData.media?.[0]?.url.trim()) {
      newErrorFields.media = true;
      errorMessages.push("An image URL is required to post a listing.");
      if (!firstErrorField) firstErrorField = document.getElementById("mediaUrl0");
    }
    if (!formData.media?.[0]?.alt.trim()) {
      newErrorFields.media = true;
      errorMessages.push("Alt text is required for accessibility.");
      if (!firstErrorField) firstErrorField = document.getElementById("mediaAlt0");
    }

    // ✅ Add expected API validation errors manually BEFORE posting
    if (formData.description && formData.description.length > 280) {
      newErrorFields.description = true;
      errorMessages.push("The description cannot be longer than 280 characters.");
    }
    if (cleanedTags.length > 8) {
      newErrorFields.tags = true;
      errorMessages.push("You cannot have more than 8 tags.");
    }

    // ✅ Show ALL expected errors immediately
    setErrorField(newErrorFields);
    setError(errorMessages.join("\n"));

    // 🚨 STOP if required fields or expected API errors exist
    if (Object.keys(newErrorFields).length > 0) {

      setLoading(false);

      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
        firstErrorField.focus();
      }
      return; // 🚨 Prevents API request if there are expected errors
    }



    // ✅ Make API request (If it reaches here, manual validation has passed)
    try {
      const response = await fetch(API_LISTINGS, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          ...formData,
          tags: cleanedTags, // ✅ Send cleaned tags
        }),
      });


      const responseData = await response.json();


      if (!response.ok) {

        const newApiErrorFields: Record<string, boolean> = {};
        const apiErrorMessages: string[] = [];

        if (responseData.errors && Array.isArray(responseData.errors)) {
          responseData.errors.forEach((err: { message: string }) => {
            apiErrorMessages.push(err.message); // ✅ Store all API errors dynamically

            if (err.message.includes("more than 8 tags")) {
              newApiErrorFields.tags = true;
            }
            if (err.message.includes("Title")) {
              newApiErrorFields.title = true;
            }
            if (err.message.includes("Description")) {
              newApiErrorFields.description = true;
            }
            if (err.message.includes("End date")) {
              newApiErrorFields.endsAt = true;
            }
            if (err.message.includes("must be valid URL")) {
              newApiErrorFields.media = true;
            }
          });
        } else {
          console.warn("No errors array found in API response.");
        }

        // ✅ Replace guessed API errors with real ones
        const finalErrorMessages = [...errorMessages, ...apiErrorMessages];

        setErrorField({ ...newErrorFields, ...newApiErrorFields });
        setError(finalErrorMessages.join("\n")); // ✅ Show ALL errors together



        const firstErrorKey = Object.keys(newApiErrorFields).find((key) => newApiErrorFields[key]);
        if (firstErrorKey) {
          const firstField = document.getElementById(firstErrorKey);
          if (firstField) {
            firstField.scrollIntoView({ behavior: "smooth", block: "center" });
            firstField.focus();
          }
        }

        throw new Error(finalErrorMessages.join("\n"));
      }


      setSuccess(true);
      setFormData({ title: "", description: "", tags: [], media: [{ url: "", alt: "" }], endsAt: "" });
    } catch (err: unknown) {
      console.error("❌ API request failed before reaching the server:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-4 pt-22">Create Listing</h1>
      <div>
        <p>All fields are required to create a listing on HeartBids. This ensures that the buyers know what they are bidding on and creates a safe experience for everyone.</p>
      </div>
      {error && <ErrorMessage message={error} />}
      {success && <p className="text-green-500">Listing created successfully!</p>}
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
          <input id="tags" ref={tagsRef} type="text" name="tags" onChange={handleTagChange} className={`w-full p-3 border rounded-md ${errorField.tags ? "border-red-500" : "border-gray-300"}`} />
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
            {loading ? "Creating..." : "Create Listing"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListingPage;
