// types/supabase.ts
export interface Site {
  id: string; // UUID is represented as a string in TypeScript
  title: string;
  url: string;
  description: string | null; // Since `description` can be NULL in SQL
  thumbnail: string;
  tags: string[]; // ARRAY in Supabase is represented as an array in TypeScript
  gsap_used: boolean;
  social_link: string | null;
  video_url: string | null;
  status: "pending" | "approved" | "rejected"; // Adjust based on your actual status values
  created_at: string; // ISO timestamp string
}
