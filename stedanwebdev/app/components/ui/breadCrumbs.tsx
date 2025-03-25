"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <div className="mb-4 text-sm breadcrumbs">
      <ul className="text-[var(--text-color)] [&>li>:first-child]:hover:text-[var(--span-color)] [&>li>:first-child]:transition-colors">
        <li className="!text-[var(--text-color)]">
          <Link href="/" className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const formattedSegment =
            segment.charAt(0).toUpperCase() +
            segment.slice(1).replace(/-/g, " ");

          return (
            <li key={index} className="max-w-[200px] truncate">
              {index === pathSegments.length - 1 ? (
                <span className="font-medium text-[var(--span-color)]">
                  {formattedSegment}
                </span>
              ) : (
                <Link
                  href={path}
                  className="flex items-center gap-1 transition-colors duration-200"
                >
                  <svg
                    className="w-3 h-3 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {formattedSegment}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
