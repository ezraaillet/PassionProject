const { app, output } = require("@azure/functions");

const sendToCosmosDb = output.cosmosDB({
  databaseName: "PassionProjectMain",
  containerName: "users",
  createIfNotExists: false,
  connection: "CosmosDBConnectionString",
});

app.http("InsertUser", {
  methods: ["POST"],
  extraOutputs: [sendToCosmosDb],
  handler: async (request, context) => {
    try {
      context.log(`Http function processed request for URL "${request.url}"`);

      // Parse request body as JSON for POST requests
      const user = await request.json();

      // Check if the required data (user object) is present
      if (!user) {
        return { status: 400, body: "Missing required user data" };
      }

      // Generate a unique ID for the user
      user.id =
        new Date().toISOString() + Math.random().toString().substring(2, 10);

      // Output the complete user object to Cosmos DB
      context.extraOutputs.set(sendToCosmosDb, user);

      const responseMessage = "User Successfully inserted into database.";

      // Return response to HTTP client
      return { body: responseMessage };
    } catch (error) {
      context.log(`Error: ${error}`);
      return { status: 500, body: "Internal Server Error" };
    }
  },
});
