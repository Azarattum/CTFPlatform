import Service from "../../common/service.abstract";
import Board from "../models/scoreboard.class";
import Event from "../models/event.class";
import Api, { Method } from "./api.class";
import User from "../models/user.class";

/**
 * Service for managing scoreboard
 */
export default class Scoreboard extends Service<"">() {
	private static api: Api | null = null;
	private static event: Event | null = null;

	public static initialize(api: Api): void {
		this.api = api;
	}

	/**
	 * Fetches and returns users scoreboard
	 */
	public static async getScoreboard(): Promise<Board> {
		if (!this.api) return new Board();

		//Fetch event
		if (!this.event) {
			const eventData = await this.api.call(Method.event, {
				Name: "",
				Page: 0
			});
			if (!eventData.success) {
				throw new Error("Unable to load event!");
			}

			this.event = new Event(
				+eventData.data[0].id_event,
				eventData.data[0].date_end
			);
		}

		const result = await this.api.call(Method.scoreboard, {
			id_event: this.event.id
		});

		if (!result.success) return new Board();

		const board = new Board();
		for (const userData of result.data as any[]) {
			const user = new User(
				+userData.id_user,
				userData.name,
				userData.time,
				userData.point
			);

			board.addUser(user);
		}

		return board;
	}
}
