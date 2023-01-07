import { CodegenConfig } from "@graphql-codegen/cli";
import { graphqlURI } from "./src/config";

const config: CodegenConfig = {
  schema: "../backend/schema.graphql",
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
