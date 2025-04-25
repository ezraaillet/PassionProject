const { app } = require("@azure/functions");
const { CosmosClient } = require("@azure/cosmos");

const client = new CosmosClient(process.env["CosmosDBConnectionString"]);
const database = client.database("PassionProjectMain");
const container = database.container("users");

app.http("UpdateUser", {
    methods: ["PUT", "POST"],
    handler: async (request, context) => {
        try {
            const updatedUser = await request.json();
            context.log(`User data "${updatedUser}" received for update.`);

            // Ensure both email and id are provided and match
            if (!updatedUser || !updatedUser.email) {
                return { status: 400, body: "Missing required 'email' field for update." };
            }

            // Ensure id matches email
            updatedUser.id = updatedUser.email;

            // Perform full document replace using id & partition key (which is email)
            const response = await container
                .item(updatedUser.id, updatedUser.email)
                .replace(updatedUser);

            return {
                status: 200,
                body: `User with email ${updatedUser.email} successfully updated.`,
            };
        } catch (error) {
            context.log.error("Update failed", error);
            return {
                status: 500,
                body: "Failed to update user. " + error.message,
            };
        }
    },
});
