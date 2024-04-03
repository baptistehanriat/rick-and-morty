"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export function DiscoverLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex flex-col gap-y-4 p-4 sm:p-8">
        <h1 className="text-3xl font-semibold">Discover</h1>
        <div className="flex rounded-lg bg-gray-100 w-min p-1">
          <CategoryItem
            testId="navigate-to-characters"
            href="/discover/characters"
          >
            Characters
          </CategoryItem>
          <CategoryItem testId="navigate-to-episodes" href="/discover/episodes">
            Episodes
          </CategoryItem>
          <CategoryItem
            testId="navigate-to-locations"
            href="/discover/locations"
          >
            Locations
          </CategoryItem>
        </div>
        {children}
      </main>
    </>
  );
}

function CategoryItem({
  href,
  testId,
  children,
}: {
  href: string;
  testId?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Link
      data-testid={testId}
      className={cn(
        "text-md text-gray-500 hover:text-black px-3 py-2 rounded-md",
        pathname === href && "bg-white font-medium text-black"
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
