/**
 * Represents a user in the scoreboard
 */
export default class User {
	public id: number;
	public name: string;
	public lastFlag: Date | null;
	public points: number;

	/**
	 * Creates a task object
	 */
	public constructor(
		id: number,
		name: string,
		lastFlag: string | Date | null = null,
		points: number = 0
	) {
		this.id = id;
		this.name = name;
		this.points = points;
		this.lastFlag = lastFlag ? new Date(lastFlag) : null;
	}
}
