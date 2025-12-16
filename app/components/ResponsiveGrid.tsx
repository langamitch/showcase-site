// components/ResponsiveGrid.tsx
import SiteCard from "./SiteCard";
import { Site } from "../../types/supabase";

interface ResponsiveGridProps {
  sites: Site[];
}

export default function ResponsiveGrid({ sites }: ResponsiveGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {sites.map((site) => (
        <SiteCard
          key={site.id}
          imageSrc={site.thumbnail}
          title={site.title}
          description={site.description || ""}
          gsapUsed={site.gsap_used}
          url={site.url}
          tags={site.tags}
        />
      ))}
    </div>
  );
}
