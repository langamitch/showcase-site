// components/SiteForm.tsx
'use client';
import { useState, useRef, ChangeEvent } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function SiteForm() {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    thumbnail: null as File | null,
    tags: [] as string[],
    gsap_used: false,
    social_link: "",
    video: null as File | null,
  });

  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    const updatedTags = [...formData.tags];
    updatedTags.splice(index, 1);
    setFormData({ ...formData, tags: updatedTags });
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "thumbnail" | "video"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, [type]: file });
    }
  };

const uploadFile = async (file: File, bucket: string, folder: string) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  console.log(`Uploading file to bucket: ${bucket}, path: ${filePath}`);

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    console.error("Upload error:", error);
    throw error;
  }

  console.log("Upload successful:", data);

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath);

  console.log("Public URL:", publicUrl);

  return publicUrl;
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    let thumbnailUrl = "";
    if (formData.thumbnail) {
      thumbnailUrl = await uploadFile(
        formData.thumbnail,
        "media",
        "thumbnails"
      );
    }

    let videoUrl = "";
    if (formData.video) {
      videoUrl = await uploadFile(formData.video, "media", "videos");
    }

    const { error } = await supabase.from("sites").insert([
      {
        title: formData.title,
        url: formData.url,
        description: formData.description,
        thumbnail: thumbnailUrl,
        tags: formData.tags,
        gsap_used: formData.gsap_used,
        social_link: formData.social_link,
        video_url: videoUrl,
        status: "pending", // Ensure status is set to 'pending'
      },
    ]);

    if (error) {
      throw error;
    }

    setSubmitStatus({
      success: true,
      message: "Site submitted successfully!",
    });
    setFormData({
      title: "",
      url: "",
      description: "",
      thumbnail: null,
      tags: [],
      gsap_used: false,
      social_link: "",
      video: null,
    });

    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  } catch (error: any) {
    setSubmitStatus({ success: false, message: error.message });
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Submit a New Site</h2>
      {submitStatus && (
        <div
          className={`p-4 mb-4 rounded ${
            submitStatus.success
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {submitStatus.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Thumbnail
          </label>
          <input
            type="file"
            ref={thumbnailInputRef}
            onChange={(e) => handleFileChange(e, "thumbnail")}
            accept="image/*"
            required
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200"
          />
        </div>
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mt-1">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              id="tags"
              name="tags"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagKeyDown}
              placeholder="Press Enter to add a tag"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="gsap_used"
            name="gsap_used"
            checked={formData.gsap_used}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="gsap_used"
            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
          >
            Uses GSAP
          </label>
        </div>
        <div>
          <label
            htmlFor="social_link"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Social Link
          </label>
          <input
            type="url"
            id="social_link"
            name="social_link"
            value={formData.social_link}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Video
          </label>
          <input
            type="file"
            ref={videoInputRef}
            onChange={(e) => handleFileChange(e, "video")}
            accept="video/*"
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Site"}
        </button>
      </form>
    </div>
  );
}




