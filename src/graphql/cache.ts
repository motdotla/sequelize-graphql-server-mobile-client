import { InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        preferences: {
          read(
            pref = {
              theme: "light",
              language: "en",
            }
          ) {
            return pref;
          },
        },
      },
    },
  },
});

export default cache;
