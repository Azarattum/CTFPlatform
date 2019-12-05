/**
 * Represents an event
 */
export default class Event {
	public id: number;
	public end: Date;

	/**
	 * Creates a task object
	 */
	public constructor(id: number, end: string | Date) {
		this.id = id;
		this.end = new Date(end);
	}
}
