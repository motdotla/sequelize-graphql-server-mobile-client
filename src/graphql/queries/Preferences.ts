import { gql } from "@apollo/client";

export const APP_PREFERENCES = gql`
  query AppPreferences {
    preferences @client {
      theme
      language
    }
  }
`;
