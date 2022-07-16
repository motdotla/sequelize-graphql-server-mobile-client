import { gql } from "@apollo/client";

export const LOGIN_WITH_EMAIL = gql`
  mutation LoginWithEmail($input: EmailLoginInput!) {
    loginWithEmail(input: $input) {
      code
      success
      message
      accessToken
      refreshToken
    }
  }
`;

export const REGISTER_WITH_EMAIL = gql`
  mutation RegisterWithEmail($input: CreateUserInput!) {
    registerWithEmail(input: $input) {
      code
      success
      message
      errors {
        message
        field
      }
      accessToken
      refreshToken
    }
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: EmailAddress!) {
    requestPasswordReset(email: $email) {
      code
      success
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: PasswordResetInput!) {
    resetPassword(input: $input) {
      code
      success
      message
      errors {
        message
        field
      }
      accessToken
      refreshToken
    }
  }
`;

export const LOGIN_WITH_SOCIAL_PROVIDER = gql`
  mutation LoginWithSocialProvider($input: SocialLoginInput!) {
    loginWithSocialProvider(input: $input) {
      code
      success
      message
      accessToken
      refreshToken
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($token: String!) {
    deleteAccount(token: $token) {
      code
      success
      message
    }
  }
`;

export const REQUEST_DELETE_ACCOUNT = gql`
  mutation RequestDeleteAccount {
    requestDeleteAccount {
      code
      success
      message
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      code
      success
      message
    }
  }
`;

export const REQUEST_EMAIL_VERIFICATION = gql`
  mutation RequestEmailVerification($email: EmailAddress!) {
    requestEmailVerification(email: $email) {
      code
      success
      message
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token) {
      code
      success
      message
    }
  }
`;
