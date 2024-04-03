export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Pick<Location, "id" | "name">;
  location: Pick<Location, "id" | "name">;
  image: string;
  episode: Pick<Episode, "id" | "name" | "episode">[];
}

export interface CharactersResponse {
  characters: {
    results: Pick<Character, "id" | "name" | "status" | "image" | "species">[];
  };
}

export interface CharacterByIdResponse {
  character: Character;
}

export interface CharactersCountAndPagesResponse {
  characters: {
    info: {
      count: number;
      pages: number;
    };
  };
}

export interface EpisodesCountAndPagesResponse {
  episodes: {
    info: {
      count: number;
      pages: number;
    };
  };
}

export interface LocationsCountAndPagesResponse {
  episodes: {
    info: {
      count: number;
      pages: number;
    };
  };
}

export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: Pick<Character, "id" | "name">[];
}

export interface EpisodesResponse {
  episodes: {
    results: Omit<Episode, "characters">[];
  };
}

export interface EpisodeByIdResponse {
  episode: Episode;
}

export interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents?: Pick<Character, "id" | "name">[];
}

export interface LocationsResponse {
  locations: {
    results: Omit<Location, "residents">[];
  };
}

export interface LocationByIdResponse {
  location: Location;
}
