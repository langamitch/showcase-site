// types/supabase.ts
export interface Site {
  id: string;
  title: string;
  url: string;
  description: string | null;
  thumbnail: string;
  tags: string[]; // Ensure tags is always an array
  gsap_used: boolean;
  social_link: string | null;
  video_url: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}
