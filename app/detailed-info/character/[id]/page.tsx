"use client";

import { DataNotFoundMessage } from "@/components/DataNotFoundMessage";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Field } from "@/components/Field";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PrettyLink } from "@/components/PrettyLink";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GET_CHARACTER_BY_ID } from "@/graphql/queries";
import { type CharacterByIdResponse } from "@/graphql/types";
import { useQuery } from "@apollo/client";

export default function CharacterPage({ params }: { params: { id: string } }) {
  const { data, loading, error } = useQuery<CharacterByIdResponse>(
    GET_CHARACTER_BY_ID,
    {
      variables: { id: params.id },
    }
  );

  return (
    <div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage />}
      {data?.character ? (
        <div className="flex flex-col p-8 gap-4">
          <Avatar className="size-48">
            <AvatarImage src={data.character.image} />
          </Avatar>
          <Field name="Name">{data.character.name}</Field>
          <Field name="Species">{data.character.species}</Field>
          <Field name="Gender">{data.character.gender}</Field>
          <Field name="Status">{data.character.status}</Field>
          <Field name="Origin">
            {data.character.origin.id ? (
              <PrettyLink
                url={`/detailed-info/location/${data.character.origin.id}`}
                text={data.character.origin.name}
              />
            ) : (
              data.character.origin.name
            )}
          </Field>
          <Field name="Last known location">
            {data.character.location.id ? (
              <PrettyLink
                url={`/detailed-info/location/${data.character.location.id}`}
                text={data.character.location.name}
              />
            ) : (
              data.character.location.name
            )}
          </Field>
          <Field name="Episodes in which this character appeared">
            <>
              {data.character.episode.map((episode) => (
                <PrettyLink
                  key={episode.id}
                  url={`/detailed-info/episode/${episode.id}`}
                  text={episode.episode + " " + episode.name}
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
