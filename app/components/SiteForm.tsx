"use client";
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import Button from "./Button";
import Image from "next/image";

// Define the form data structure
interface FormData {
  title: string;
  url: string;
  authors: string[];
  description: string;
  builtWith: string;
  technologies: string[];
  images: File[];
  video: File | null;
  socialLinks: {
    platform: string;
    username: string;
  }[];
}

export default function SiteForm() {
  // Available technologies for checkboxes
  const availableTechnologies = [
    "Web & Interactive",
    "3D",
    "ScrollSmoother",
    "ScrollTrigger",
    "React",
    "Next.js",
    "GSAP",
    "Three.js",
    "Framer Motion",
    "Tailwind CSS",
  ];

  // Available social platforms
  const socialPlatforms = [
    "Instagram",
    "X (Twitter)",
    "Dribbble",
    "LinkedIn",
    "Behance",
  ];

  // Initialize form state
  const [formData, setFormData] = useState<FormData>({
    title: "",
    url: "",
    authors: [""],
    description: "",
    builtWith: "",
    technologies: [],
    images: [],
    video: null,
    socialLinks: [],
  });

  // State for input fields
  const [authorInput, setAuthorInput] = useState("");
  const [socialPlatform, setSocialPlatform] = useState("");
  const [socialUsername, setSocialUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number | null;
  }>({});
  const [submissionStep, setSubmissionStep] = useState<
    "idle" | "checking" | "submitting" | "success" | "error"
  >("idle");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add an author
  const addAuthor = () => {
    if (authorInput.trim() !== "") {
      setFormData({
        ...formData,
        authors: [...formData.authors, authorInput.trim()],
      });
      setAuthorInput("");
    }
  };

  // Remove an author
  const removeAuthor = (index: number) => {
    const updatedAuthors = [...formData.authors];
    updatedAuthors.splice(index, 1);
    setFormData({ ...formData, authors: updatedAuthors });
  };

  // Toggle technology selection
  const toggleTechnology = (tech: string) => {
    const updatedTech = formData.technologies.includes(tech)
      ? formData.technologies.filter((t) => t !== tech)
      : [...formData.technologies, tech];
    setFormData({ ...formData, technologies: updatedTech });
  };

  // Handle image selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 3 - formData.images.length);
      setFormData({ ...formData, images: [...formData.images, ...newImages] });
    }
  };

  // Remove an image
  const removeImage = (index: number) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };

  // Add a social link
  const addSocialLink = () => {
    if (socialPlatform && socialUsername.trim() !== "") {
      setFormData({
        ...formData,
        socialLinks: [
          ...formData.socialLinks,
          { platform: socialPlatform, username: socialUsername.trim() },
        ],
      });
      setSocialPlatform("");
      setSocialUsername("");
    }
  };

  // Remove a social link
  const removeSocialLink = (index: number) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks.splice(index, 1);
    setFormData({ ...formData, socialLinks: updatedLinks });
  };

  // Upload a file to Supabase Storage
  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("media")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) throw new Error(`Failed to upload file: ${error.message}`);

    const { data: publicData } = supabase.storage
      .from("media")
      .getPublicUrl(filePath);
    return publicData.publicUrl;
  };

  // Submit the form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStep("checking");

    try {
      // Simulate a brief check
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmissionStep("submitting");

      // Upload images
      const imageUrls = await Promise.all(
        formData.images.map(async (image, index) => {
          setUploadProgress((prev) => ({ ...prev, [`image-${index}`]: 0 }));
          const url = await uploadFile(image, "images");
          setUploadProgress((prev) => ({ ...prev, [`image-${index}`]: 100 }));
          return url;
        })
      );

      // Upload video (if provided)
      let videoUrl = "";
      if (formData.video) {
        setUploadProgress((prev) => ({ ...prev, video: 0 }));
        videoUrl = await uploadFile(formData.video, "videos");
        setUploadProgress((prev) => ({ ...prev, video: 100 }));
      }

      // Insert data into Supabase
      const { error } = await supabase.from("sites").insert([
        {
          title: formData.title,
          url: formData.url,
          authors: formData.authors,
          description: formData.description,
          built_with: formData.builtWith,
          technologies: formData.technologies,
          image_urls: imageUrls,
          video_url: videoUrl,
          social_links: formData.socialLinks,
          status: "pending",
        },
      ]);

      if (error) throw new Error(`Failed to submit site: ${error.message}`);

      // Success
      setSubmissionStep("success");
      setSubmitStatus({
        success: true,
        message: "Site submitted successfully!",
      });
    } catch (error: any) {
      setSubmissionStep("error");
      setSubmitStatus({ success: false, message: error.message });
    }
  };

  // Reset form and go home
  const handleDone = () => {
    setFormData({
      title: "",
      url: "",
      authors: [""],
      description: "",
      builtWith: "",
      technologies: [],
      images: [],
      video: null,
      socialLinks: [],
    });
    setAuthorInput("");
    setSocialPlatform("");
    setSocialUsername("");
    setIsSubmitting(false);
    setSubmissionStep("idle");
    setSubmitStatus(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
    router.push("/"); // Redirect to home
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md relative">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Submit your work.
          </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <TextInput
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />

        {/* URL */}
        <TextInput
          label="URL"
          name="url"
          type="url"
          value={formData.url}
          onChange={handleInputChange}
          required
        />

        {/* Authors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Authors <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.authors.map((author, index) => (
              <div
                key={index}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full flex items-center"
              >
                {author}
                <button
                  type="button"
                  onClick={() => removeAuthor(index)}
                  className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex mt-2">
            <input
              type="text"
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
              placeholder="Add an author"
              className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <Button type="button" onClick={addAuthor}>
              Add
            </Button>
          </div>
        </div>

        {/* Description */}
        <TextArea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />

        {/* Built With */}
        <TextInput
          label="Built With"
          name="builtWith"
          value={formData.builtWith}
          onChange={handleInputChange}
        />

        {/* Technologies (Checkboxes) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Technology & Tools
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {availableTechnologies.map((tech) => (
              <div key={tech} className="flex items-center">
                <input
                  type="checkbox"
                  id={tech}
                  checked={formData.technologies.includes(tech)}
                  onChange={() => toggleTechnology(tech)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={tech}
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  {tech}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Images (1-3) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Images <span className="text-red-500">*</span> (1-3)
          </label>
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleImageChange}
            accept="image/*"
            multiple
            required
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="h-20 w-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
                {uploadProgress[`image-${index}`] !== undefined && (
                  <div className="h-1 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${uploadProgress[`image-${index}`]}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Video */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Video (Optional)
          </label>
          <input
            type="file"
            ref={videoInputRef}
            onChange={(e) =>
              setFormData({ ...formData, video: e.target.files?.[0] || null })
            }
            accept="video/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200"
          />
          {uploadProgress.video !== undefined && (
            <div className="h-1 bg-gray-200 rounded-full mt-1">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${uploadProgress.video}%` }}
              />
            </div>
          )}
        </div>

        {/* Social Links */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Social Links
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.socialLinks.map((link, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full flex items-center"
              >
                {link.platform}: @{link.username}
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="ml-2 text-gray-600 dark:text-gray-300 hover:text-gray-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex mt-2 gap-2">
            <select
              value={socialPlatform}
              onChange={(e) => setSocialPlatform(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select Platform</option>
              {socialPlatforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={socialUsername}
              onChange={(e) => setSocialUsername(e.target.value)}
              placeholder="Username"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <Button type="button" onClick={addSocialLink}>
              Add
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Site"}
        </Button>
      </form>

      {/* Submission Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-black p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
            <div className="mb-4">
              <Image
                src="/spinner.svg"
                alt="Loading..."
                width={60}
                height={60}
                className="mx-auto"
              />
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-lg font-medium mb-4">
              {submissionStep === "checking" && "Checking info..."}
              {submissionStep === "submitting" && "Submitting..."}
              {submissionStep === "success" && "Submitted successfully!"}
              {submissionStep === "error" && submitStatus?.message}
            </p>
            {submissionStep === "success" && (
              <Button variant="primary" onClick={handleDone} fullWidth>
                Done
              </Button>
            )}
            {submissionStep === "error" && (
              <Button
                variant="danger"
                onClick={() => {
                  setIsSubmitting(false);
                  setSubmissionStep("idle");
                }}
                fullWidth
              >
                Try Again
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
