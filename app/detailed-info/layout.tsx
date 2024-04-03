"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DetailedInfoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <div className="relative flex justify-center py-16 px-4">
      <Button
        onClick={() => router.back()}
        variant="outline"
        size="icon"
        className="absolute left-4 top-4"
      >
        <ChevronLeft size={20} />
      </Button>
      <Card className="w-full sm:max-w-[800px]">{children}</Card>
    </div>
  );
}
