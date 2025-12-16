// components/SiteCard.tsx
import Image from "next/image";

interface SiteCardProps {
  imageSrc: string;
  title: string;
  description: string;
  gsapUsed: boolean;
  url: string;
  tags: string[];
}

export default function SiteCard({
  imageSrc,
  title,
  description,
  gsapUsed,
  url,
  tags = [],
}: SiteCardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <div className="relative aspect-square bg-gray-200 dark:bg-gray-700">
          {imageSrc ? (
            <Image src={imageSrc} alt={title} fill className="object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              No Image
            </div>
          )}
        </div>
      </a>
      <div className="p-4 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold hover:underline"
          >
            {title}
          </a>
          {gsapUsed && (
            <span className="bg-gray-200 dark:bg-gray-700 text-xs px-2 py-1 rounded">
              GSAP
            </span>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
