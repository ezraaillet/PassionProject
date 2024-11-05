import { useAuth0 } from "@auth0/auth0-react";

export default function UserService() {
  const url: string = process.env.REACT_APP_LOCAL_API_URL!;
  const prodUrl: string = process.env.REACT_APP_PROD_API_URL!;
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();

  async function createUser(userToInsert: any) {
    userToInsert.email = user?.email;
    try {
      const response = await fetch(`${prodUrl}/InsertUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToInsert),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.text(); // Return the response data
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async function getUserByEmail(email: string) {
    try {
      const response = await fetch(`${prodUrl}/GetUserByEmail?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json(); // Return the response data
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  return {
    createUser,
    getUserByEmail,
  };
}
