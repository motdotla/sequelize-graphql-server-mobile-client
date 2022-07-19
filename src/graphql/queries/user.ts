import { gql } from "@apollo/client";

export const UPDATE_FULLNAME = gql`
  mutation UpdateCurrentUserFullname($input: UpdateFullnameInput!) {
    updateCurrentUserFullname(input: $input) {
      code
      success
      message
      errors {
        message
        field
      }
      user {
        id
        firstName
        lastName
        fullName
      }
    }
  }
`;

export const UPDATE_USERNAME = gql`
  mutation UpdateCurrentUserUsername($username: String!) {
    updateCurrentUserUsername(username: $username) {
      code
      success
      message
      errors {
        message
        field
      }
      user {
        id
        username
      }
    }
  }
`;

export const UPDATE_LOCALE = gql`
  mutation UpdateCurrentUserLocale($locale: Locale!) {
    updateCurrentUserLocale(locale: $locale) {
      code
      success
      message
      errors {
        message
        field
      }
      user {
        id
        locale
      }
    }
  }
`;

export const UPDATE_TIMEZONE = gql`
  mutation UpdateCurrentUserTimeZone($timezone: TimeZone!) {
    updateCurrentUserTimeZone(timezone: $timezone) {
      code
      success
      message
      errors {
        message
        field
      }
      user {
        id
        timezone
      }
    }
  }
`;

export const REMOVE_AVATAR = gql`
  mutation RemoveCurrentUserAvatar {
    removeCurrentUserAvatar {
      code
      success
      message
      user {
        id
        avatar {
          url
          thumbnail
        }
        socialAvatarURL
      }
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      code
      success
      message
      user {
        id
        firstName
        lastName
        fullName
        username
        email
        avatar {
          url
          thumbnail
        }
        socialAvatarURL
        locale
        timezone
        emailVerified
      }
    }
  }
`;

export const GET_LOCALES = gql`
  query GetLocales {
    getLocales {
      code
      name
    }
  }
`;

export const GET_TIMEZONES = gql`
  query GetTimeZones {
    getTimeZones {
      timeZone
      offset
    }
  }
`;

export const USER_AVATAR_FRAGMENT = gql`
  fragment Avatar on User {
    avatar {
      url
      thumbnail
    }
  }
`;
