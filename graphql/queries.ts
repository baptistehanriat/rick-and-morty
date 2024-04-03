import { gql } from "@apollo/client";

export const GET_CHARACTER_BY_ID = gql`
  query GetCharacterById($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
      }
      location {
        id
        name
      }
      image
      episode {
        id
        name
        episode
      }
    }
  }
`;

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        status
        species
        image
      }
    }
  }
`;

export const GET_EPISODE_BY_ID = gql`
  query GetEpisodeById($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
      }
    }
  }
`;

export const GET_EPISODES = gql`
  query GetEpisodes($page: Int) {
    episodes(page: $page) {
      results {
        id
        name
        episode
        air_date
      }
    }
  }
`;

export const GET_LOCATION_BY_ID = gql`
  query GetLocationById($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      residents {
        id
        name
      }
    }
  }
`;

export const GET_LOCATIONS = gql`
  query GetLocations($page: Int) {
    locations(page: $page) {
      results {
        id
        name
        type
        dimension
      }
    }
  }
`;

export const GET_CHARACTERS_COUNT_AND_PAGES = gql`
  query GetCharactersCountAndPages {
    characters {
      info {
        count
        pages
      }
    }
  }
`;

export const GET_EPISODES_COUNT_AND_PAGES = gql`
  query GetEpisodesCountAndPages {
    episodes {
      info {
        count
        pages
      }
    }
  }
`;

export const GET_LOCATIONS_COUNT_AND_PAGES = gql`
  query GetLocationsCountAndPages {
    locations {
      info {
        count
        pages
      }
    }
  }
`;
