const config = {
    // overwrite: true,
    schema: "./src/schema.graphql",
    generates: {
        "src/__generated__/resolvers-types.ts": {
            plugins: ["typescript", "typescript-resolvers"],
            config: {
                useIndexSignature: true,
                // contextType: "../index#MyContext",
            },
        },
    },
};
export default config;
