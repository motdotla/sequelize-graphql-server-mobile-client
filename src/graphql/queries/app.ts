import { gql } from "@apollo/client";

export const PREFERENCES = gql`
  query Preferences {
    preferences @client {
      theme
    }
  }
`;

export const AUTH_STATE = gql`
  query AuthState {
    auth @client {
      accessToken
      refreshToken
    }
  }
`;
