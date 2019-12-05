import User from "./user.class";

/**
 * Represents a scoreboard
 */
export default class Scoreboard {
	public users: User[];

	/**
	 * Creates a task object
	 */
	public constructor(users: User[] = []) {
		this.users = users;
	}

	/**
	 * Adds a user to the scoreboard
	 * @param user New scoreboard user
	 */
	public addUser(user: User): void {
		this.users.push(user);
	}
}
