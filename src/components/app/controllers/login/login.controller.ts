export default class Login {
	private static container: HTMLElement | null = null;
	/**
	 * Initializes login controller
	 */
	public static initialize(): void {
		///CHAGE CONTAINER
		const container = document.getElementById("analysis-render");
		if (!container) {
			throw new Error("Container for login render not found!");
		}
		this.container = container;
	}
}
