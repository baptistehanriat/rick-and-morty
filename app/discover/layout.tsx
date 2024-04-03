import { DiscoverLayout } from "@/components/DiscoverLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DiscoverLayout>{children}</DiscoverLayout>;
}
