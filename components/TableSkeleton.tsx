import { ITEMS_PER_PAGE } from "./Pagination";
import { Skeleton } from "./ui/skeleton";
import { TableCell, TableRow } from "./ui/table";

export function TableSkeleton() {
  return (
    <>
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
        <TableRow key={index}>
          <TableCell className="flex gap-4 items-center">
            <Skeleton className="w-full rounded-full h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full rounded-full h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full rounded-full h-4" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
