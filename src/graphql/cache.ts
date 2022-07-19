import { InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        preferences: {
          read(
            pref = {
              theme: "light",
            }
          ) {
            return pref;
          },
        },
      },
    },
    User: {
      fields: {
        avatar: {
          keyArgs: false,
        },
      },
    },
  },
});

export default cache;
