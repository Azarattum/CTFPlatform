export default class Tasks {
	private static container: HTMLElement | null = null;
	/**
	 * Initializes tasks controller
	 */
	public static initialize(): void {
		///CHAGE CONTAINER
		const container = document.getElementById("analysis-render");
		if (!container) {
			throw new Error("Container for tasks render not found!");
		}
		this.container = container;
	}
}
