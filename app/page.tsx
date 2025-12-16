// pages/index.tsx
import { useState, useEffect } from "react";
import ResponsiveGrid from "./components/ResponsiveGrid";
import { supabase } from "../lib/supabaseClient";
import { Site } from "../types/supabase";

export default function Home() {
  const [sites, setSites] = useState<Site[]>([]);

  useEffect(() => {
    const fetchSites = async () => {
      const { data, error } = await supabase
        .from("sites")
        .select("*")
        .eq("status", "approved"); // Only fetch approved sites

      if (error) {
        console.error("Error fetching sites:", error);
      } else {
        setSites(data || []);
      }
    };

    fetchSites();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ResponsiveGrid sites={sites} />
    </div>
  );
}
