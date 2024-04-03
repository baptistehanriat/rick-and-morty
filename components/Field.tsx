export function Field({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 text-md">
      <p className="text-sm text-gray-500">{name}:</p>
      {children}
    </div>
  );
}
