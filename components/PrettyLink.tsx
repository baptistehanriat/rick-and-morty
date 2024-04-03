import Link from "next/link";

export function PrettyLink({ url, text }: { url: string; text: string }) {
  return (
    <Link href={url} className="text-md hover:text-orange-500">
      {text}
    </Link>
  );
}
