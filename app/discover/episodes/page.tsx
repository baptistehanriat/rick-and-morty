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
import { GET_EPISODES, GET_EPISODES_COUNT_AND_PAGES } from "@/graphql/queries";
import { EpisodesResponse } from "@/graphql/types";
import { useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function EpisodesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  const countAndPagesQuery = useQuery(GET_EPISODES_COUNT_AND_PAGES);

  const { loading, error, data } = useQuery<EpisodesResponse>(GET_EPISODES, {
    variables: { page },
  });

  const onViewEpiosdeDetailedInfo = (id: string) => {
    router.push(`/detailed-info/episode/${id}`);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-end">
        <div className="flex gap-2 flex-col">
          <CardTitle>Episodes</CardTitle>
          <CardDescription>
            Browse through all the episodes from the Rick and Morty show.
          </CardDescription>
        </div>
        <Pagination
          currentPage={page}
          totalItems={countAndPagesQuery?.data?.episodes.info.count || 0}
          category="episodes"
        />
      </CardHeader>
      <CardContent>
        <Table data-testid="episodes-table">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[150px]">Episode</TableHead>
              <TableHead className="w-full">Name</TableHead>
              <TableHead className="min-w-[200px]">Air date</TableHead>
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
              data.episodes.results.map((episode) => (
                <TableRow
                  key={episode.id}
                  onClick={() => onViewEpiosdeDetailedInfo(episode.id)}
                  className="cursor-pointer"
                >
                  <TableCell>{episode.episode}</TableCell>
                  <TableCell>{episode.name}</TableCell>
                  <TableCell>{episode.air_date}</TableCell>
                </TableRow>
              ))}
            {data && data.episodes.results.length === 0 && (
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
