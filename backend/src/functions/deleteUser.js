const { app, output } = require("@azure/functions");

const deleteFromCosmosDb = output.cosmosDB({
    databaseName: "PassionProjectMain",
    containerName: "users",
    createIfNotExists: false,
    connection: "CosmosDBConnectionString",
});

app.http("DeleteUserByEmail", {
    methods: ["DELETE"],
    extraOutputs: [deleteFromCosmosDb],
    handler: async (request, context) => {
        try {
            context.log(`Processing DELETE request for URL: "${request.url}"`);

            // Get the email from query parameters
            const email = request.query.get("email");

            if (!email) {
                return { status: 400, body: "Missing required query parameter: email" };
            }

            // Prepare the document for deletion
            const deletePayload = {
                id: email, // Using email as the ID
                partitionKey: email, // Using email as the partition key
            };

            // Set the payload for deletion
            context.extraOutputs.set(deleteFromCosmosDb, deletePayload);

            return { status: 200, body: "User successfully deleted." };
        } catch (error) {
            context.log(`Error: ${error}`);
            return { status: 500, body: "Internal Server Error" };
        }
    },
});
