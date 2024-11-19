const { CosmosClient } = require("@azure/cosmos");
const { app } = require("@azure/functions");

const client = new CosmosClient(process.env.CosmosDBConnectionString);
const database = client.database("PassionProjectMain");
const container = database.container("users");

app.http("GetUsersBySponsorStateAndUserType", {
    methods: ["GET"],
    handler: async (request, context) => {
        try {
            context.log(`Http function processed request for URL "${request.url}"`);

            // Extract sponsorState and userType from query parameters
            const sponsorState = request.query.get("sponsorState");
            const userType = parseInt(request.query.get("userType"), 10); // Ensure userType is a number

            if (!sponsorState || isNaN(userType)) {
                return { status: 400, body: "Both sponsorState (string) and userType (number) are required" };
            }

            // Log the input parameters for debugging
            context.log("Query Parameters:", { sponsorState, userType });

            // Construct a query for the specific sponsorState and userType
            const querySpec = {
                query: "SELECT * FROM c WHERE c.sponsorState = @sponsorState AND c.userType = @userType",
                parameters: [
                    { name: "@sponsorState", value: sponsorState },
                    { name: "@userType", value: userType },
                ],
            };

            // Execute the query using Cosmos SDK
            const { resources: userDocuments } = await container.items
                .query(querySpec)
                .fetchAll();

            context.log("Query Results:", userDocuments);

            if (!userDocuments || userDocuments.length === 0) {
                return { status: 404, body: "No users found for the specified criteria" };
            }

            return {
                status: 200,
                body: JSON.stringify(userDocuments), // Return all matching documents
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
