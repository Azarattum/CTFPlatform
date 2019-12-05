import Board from "../../models/scoreboard.class";

export default class Scoreboard {
	private static container: HTMLElement | null = null;
	/**
	 * Initializes scoreboard controller
	 */
	public static initialize(): void {
		const container = document.getElementById("scoreboard");
		if (!container) {
			throw new Error("Container for scoreboard render not found!");
		}
		this.container = container;
	}

	public static renderScoreboard(scoreboard: Board): void {
		if (!this.container) return;
		const nodes = this.container.childNodes.length;
		for (let i = 1; i < nodes; i++) {
			const node = this.container.childNodes[1];
			this.container.removeChild(node);
		}

		for (let i = 0; i < scoreboard.users.length; i++) {
			const user = scoreboard.users[i];

			const row = document.createElement("tr");
			const place = document.createElement("td");
			place.innerText = (i + 1).toString();

			const name = document.createElement("td");
			name.innerText = user.name;
			const points = document.createElement("td");
			points.innerText = user.points.toString();

			row.appendChild(place);
			row.appendChild(name);
			row.appendChild(points);
			this.container.appendChild(row);
		}
	}
}
