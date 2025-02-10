import { IUser, IUserShort } from '@interfaces/authInterfaces';
import Knex from "knex";
import { Knex as KnexType } from "knex";
import config from "../../knexfile";

class AuthorizeUsers {
    private knexUser: KnexType;

    constructor(knexInstance?: KnexType) {
        this.knexUser = knexInstance ?? Knex(config[process.env.NODE_ENV || "development"]);
    }

    public async addUser(userData: IUser): Promise<void> {
        try {
            await this.knexUser("users").insert({
                id: userData.uid,
                name: userData.name,
                username: userData.username,
                email: userData.email
            });
        } catch (error) {
            console.error("authModel.ts, addUser, error adding user: ", error);
            throw new Error("Failed to add a new user.");
        }
    }

    public async getUserByUID(userUID: string): Promise<{ userData: IUserShort } | null> {
        try {
            const response = await this.knexUser("users")
                .select("name", "username")
                .where("id", userUID)
                .first(); // returns a single object, not an array
            return response ?? null;
        } catch (error) {
            console.error("authModel.ts, getUserByUID, error getting user by their uid: ", error);
            throw new Error("Failed to get the user.");
        }
    }

    public async removeUserByUID(userUID: string): Promise<void> {
        try {
            await this.knexUser("users").where("id", userUID).del();
        } catch (error) {
            console.error("authModel.ts, removeUserByUID, error deleting the user by their uid", error);
            throw new Error("Failed to remove the user.");
        }
    }
}

export default AuthorizeUsers;