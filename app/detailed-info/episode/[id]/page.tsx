"use client";

import { DataNotFoundMessage } from "@/components/DataNotFoundMessage";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Field } from "@/components/Field";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PrettyLink } from "@/components/PrettyLink";
import { GET_EPISODE_BY_ID } from "@/graphql/queries";
import { EpisodeByIdResponse } from "@/graphql/types";
import { useQuery } from "@apollo/client";

export default function EpisodePage({ params }: { params: { id: string } }) {
  const { data, loading, error } = useQuery<EpisodeByIdResponse>(
    GET_EPISODE_BY_ID,
    {
      variables: { id: params.id },
    }
  );

  return (
    <div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage />}
      {data?.episode ? (
        <div className="flex flex-col p-8 gap-4">
          <h1 className="text-xl font-semibold">Episode information</h1>
          <Field name="Name">{data.episode.name}</Field>
          <Field name="Episode">{data.episode.episode}</Field>
          <Field name="Air date">{data.episode.air_date}</Field>
          <Field name="Characters appearing in that episode">
            <>
              {data.episode.characters.map((character) => (
                <PrettyLink
                  key={character.id}
                  url={`/detailed-info/character/${character.id}`}
                  text={character.name}
                />
              ))}
            </>
          </Field>
        </div>
      ) : (
        <DataNotFoundMessage />
      )}
    </div>
  );
}
