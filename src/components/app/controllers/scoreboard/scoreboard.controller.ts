export default class Scoreboard {
	private static container: HTMLElement | null = null;
	/**
	 * Initializes scoreboard controller
	 */
	public static initialize(): void {
		///CHAGE CONTAINER
		const container = document.getElementById("analysis-render");
		if (!container) {
			throw new Error("Container for scoreboard render not found!");
		}
		this.container = container;
	}
}
