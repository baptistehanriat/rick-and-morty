"use client";

import { DataNotFoundMessage } from "@/components/DataNotFoundMessage";
import { Pagination } from "@/components/Pagination";
import { TableSkeleton } from "@/components/TableSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  GET_CHARACTERS,
  GET_CHARACTERS_COUNT_AND_PAGES,
} from "@/graphql/queries";
import { type CharactersResponse } from "@/graphql/types";
import { useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function CharactersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  const countAndPagesQuery = useQuery(GET_CHARACTERS_COUNT_AND_PAGES);

  const { loading, error, data } = useQuery<CharactersResponse>(
    GET_CHARACTERS,
    {
      variables: { page },
    }
  );

  const onViewCharacterDetailedInfo = (id: string) => {
    router.push(`/detailed-info/character/${id}`);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-end">
        <div className="flex gap-2 flex-col">
          <CardTitle>Characters</CardTitle>
          <CardDescription>
            Browse through all the characters from the Rick and Morty show.
          </CardDescription>
        </div>
        <Pagination
          currentPage={page}
          totalItems={countAndPagesQuery?.data?.characters.info.count || 0}
          category="characters"
        />
      </CardHeader>
      <CardContent>
        <Table data-testid="characters-table">
          <TableHeader>
            <TableRow>
              <TableHead className="w-full">Name</TableHead>
              <TableHead className="min-w-[150px]">Status</TableHead>
              <TableHead className="min-w-[200px]">Subspecies</TableHead>
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
              data.characters.results.map((character) => (
                <TableRow
                  key={character.id}
                  onClick={() => onViewCharacterDetailedInfo(character.id)}
                  className="cursor-pointer"
                >
                  <TableCell>
                    <div className="flex gap-4 items-center">
                      <Avatar>
                        <AvatarImage src={character.image} />
                        <AvatarFallback>...</AvatarFallback>
                      </Avatar>
                      {character.name}
                    </div>
                  </TableCell>
                  <TableCell>{character.status}</TableCell>
                  <TableCell>{character.species}</TableCell>
                </TableRow>
              ))}
            {data && data.characters.results.length === 0 && (
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
