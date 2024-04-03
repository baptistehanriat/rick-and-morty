"use client";

import { DataNotFoundMessage } from "@/components/DataNotFoundMessage";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Field } from "@/components/Field";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PrettyLink } from "@/components/PrettyLink";
import { GET_LOCATION_BY_ID } from "@/graphql/queries";
import { LocationByIdResponse } from "@/graphql/types";
import { useQuery } from "@apollo/client";

export default function LocationPage({ params }: { params: { id: string } }) {
  const { data, loading, error } = useQuery<LocationByIdResponse>(
    GET_LOCATION_BY_ID,
    {
      variables: { id: params.id },
    }
  );

  return (
    <div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage />}
      {data?.location ? (
        <div className="flex flex-col p-8 gap-4">
          <h1 className="text-xl font-semibold">Location information</h1>
          <Field name="Name">{data.location.name}</Field>
          <Field name="Dimension">{data.location.dimension}</Field>
          <Field name="Type">{data.location.type}</Field>
          <Field name="List of characters who have been last seen in the location">
            <>
              {data.location.residents?.map((resident) => (
                <PrettyLink
                  key={resident.id}
                  url={`/detailed-info/character/${resident.id}`}
                  text={resident.name}
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
