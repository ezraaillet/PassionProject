const { CosmosClient } = require("@azure/cosmos");
const { app } = require("@azure/functions");

const client = new CosmosClient(process.env.CosmosDBConnectionString);
const database = client.database("PassionProjectMain");
const container = database.container("users");

app.http("GetUserByEmail", {
  methods: ["GET"],
  handler: async (request, context) => {
    try {
      context.log(`Http function processed request for URL "${request.url}"`);

      const userEmail = request.query.get("email");
      if (!userEmail) {
        return { status: 400, body: "User email is required" };
      }

      // Construct a query for the specific email
      const querySpec = {
        query: "SELECT * FROM c WHERE c.email = @email",
        parameters: [{ name: "@email", value: userEmail }],
      };

      // Execute the query using Cosmos SDK
      const { resources: userDocuments } = await container.items
        .query(querySpec)
        .fetchAll();

      if (!userDocuments || userDocuments.length === 0) {
        return { status: 404, body: "User not found" };
      }

      return {
        status: 200,
        body: JSON.stringify(userDocuments[0]), // Return the first matching document
        headers: {
          "Content-Type": "application/json",
        },
      };
    } catch (error) {
      context.log(`Error: ${error}`);
      return { status: 500, body: "Internal Server Error" };
    }
  },
});
