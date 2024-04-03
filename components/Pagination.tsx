import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

// This value is determined by the API, see https://rickandmortyapi.com/documentation
export const ITEMS_PER_PAGE = 20;

type CategoryType = "characters" | "episodes" | "locations";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  category: CategoryType;
}

export function Pagination({
  currentPage,
  totalItems,
  category,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const nextPage = currentPage === totalPages ? undefined : currentPage + 1;
  const previousPage = currentPage === 1 ? undefined : currentPage - 1;
  const nextPageUrl = nextPage
    ? `/discover/${category}?page=${nextPage}`
    : undefined;
  const previousPageUrl = previousPage
    ? `/discover/${category}?page=${previousPage}`
    : undefined;

  return currentPage <= totalPages ? (
    <div className="flex gap-4 items-center flex-wrap">
      <PositionIndicator currentPage={currentPage} totalItems={totalItems} />
      <NavigationButtons
        nextPageUrl={nextPageUrl}
        previousPageUrl={previousPageUrl}
      />
    </div>
  ) : null;
}

function NavigationButtons({
  nextPageUrl,
  previousPageUrl,
}: {
  nextPageUrl?: string;
  previousPageUrl?: string;
}) {
  return (
    <div className="flex justify-end gap-4">
      {previousPageUrl ? (
        <Button asChild variant="outline" size="icon">
          <Link data-testid="link-prev" href={previousPageUrl}>
            <ChevronLeftIcon className="size-4" />
          </Link>
        </Button>
      ) : (
        <Button
          data-testid="link-prev-disabled"
          variant="outline"
          size="icon"
          disabled
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
      )}
      {nextPageUrl ? (
        <Button asChild variant="outline" size="icon">
          <Link data-testid="link-next" href={nextPageUrl}>
            <ChevronRightIcon className="size-4" />
          </Link>
        </Button>
      ) : (
        <Button
          data-testid="link-next-disabled"
          variant="outline"
          size="icon"
          disabled
        >
          <ChevronRightIcon className="size-4" />
        </Button>
      )}
    </div>
  );
}

export function PositionIndicator({
  currentPage,
  totalItems,
}: {
  currentPage: number;
  totalItems: number;
}) {
  const rangeStart = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const rangeEnd = currentPage * ITEMS_PER_PAGE;
  const isLastPage = rangeEnd >= totalItems;

  return (
    <p data-testid="position-indicator" className="text-sm text-gray-500">
      {rangeStart} - {isLastPage ? totalItems : rangeEnd} of {totalItems}
    </p>
  );
}
