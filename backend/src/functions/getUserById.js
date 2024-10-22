const { app, input } = require("@azure/functions");

const readFromCosmosDb = input.cosmosDB({
  databaseName: "PassionProjectMain",
  containerName: "users",
  connection: "CosmosDBConnectionString",
  id: "{id}", // Bind the ID to the function's input
  partitionKey: "{id}", // Use partition key if applicable
});

app.http("GetUserById", {
  methods: ["GET"],
  extraInputs: [readFromCosmosDb],
  handler: async (request, context) => {
    try {
      context.log(`Http function processed request for url "${request.url}"`);

      // Extract ID from query parameters
      const userId = request.query.get("id");

      if (!userId) {
        return { status: 400, body: "User ID is required" };
      }

      // Get the user document from Cosmos DB
      const userDocument = context.extraInputs.get(readFromCosmosDb);

      if (!userDocument) {
        return { status: 404, body: "User not found" };
      }

      // Return the user document
      return {
        status: 200,
        body: JSON.stringify(userDocument), // Convert object to JSON string
        headers: {
          "Content-Type": "application/json", // Set the response content type to JSON
        },
      };
    } catch (error) {
      context.log(`Error: ${error}`);
      return { status: 500, body: "Internal Server Error" };
    }
  },
});
