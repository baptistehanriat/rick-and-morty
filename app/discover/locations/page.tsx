"use client";

import { DataNotFoundMessage } from "@/components/DataNotFoundMessage";
import { Pagination } from "@/components/Pagination";
import { TableSkeleton } from "@/components/TableSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GET_LOCATIONS,
  GET_LOCATIONS_COUNT_AND_PAGES,
} from "@/graphql/queries";
import { LocationsResponse } from "@/graphql/types";
import { useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";

export default function LocationsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  const countAndPagesQuery = useQuery(GET_LOCATIONS_COUNT_AND_PAGES);

  const { loading, error, data } = useQuery<LocationsResponse>(GET_LOCATIONS, {
    variables: { page },
  });

  const onViewLocationDetailedInfo = (id: string) => {
    router.push(`/detailed-info/location/${id}`);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-end">
        <div className="flex gap-2 flex-col">
          <CardTitle>Locations</CardTitle>
          <CardDescription>
            Browse through all the locations from the Rick and Morty show.
          </CardDescription>
        </div>
        <Pagination
          currentPage={page}
          totalItems={countAndPagesQuery?.data?.locations.info.count || 0}
          category="locations"
        />
      </CardHeader>
      <CardContent>
        <Table data-testid="locations-table">
          <TableHeader>
            <TableRow>
              <TableHead className="w-full">Name</TableHead>
              <TableHead className="min-w-[150px]">Type</TableHead>
              <TableHead className="min-w-[200px]">Dimension</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {error && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-64">
                  Something went wrong. Please retry.
                </TableCell>
              </TableRow>
            )}
            {loading && <TableSkeleton />}
            {data &&
              data.locations.results.map((location) => (
                <TableRow
                  key={location.id}
                  onClick={() => onViewLocationDetailedInfo(location.id)}
                  className="cursor-pointer"
                >
                  <TableCell>{location.name}</TableCell>
                  <TableCell>{location.type}</TableCell>
                  <TableCell>{location.dimension}</TableCell>
                </TableRow>
              ))}
            {data && data.locations.results.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>
                  <DataNotFoundMessage />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
