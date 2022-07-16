import { gql } from "@apollo/client";

export const PREFERENCES = gql`
  query AppPreferences {
    preferences @client {
      theme
    }
  }
`;
