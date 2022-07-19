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
    Photo: {
      keyFields: false,
    },
  },
});

export default cache;
