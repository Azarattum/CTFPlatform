import Service from "../../common/service.abstract";

export default class Registration extends Service<"registered">() {
	private static registrationButton: HTMLButtonElement | null = null;

	private static timeout: NodeJS.Timeout;

	/**
	 * Initializes login controller
	 */
	public static initialize(): void {
		const loginButton = document.getElementById("registration-button");
		if (!loginButton) {
			throw new Error("Registration button not found!");
		}

		this.registrationButton = loginButton as HTMLButtonElement;

		(this
			.registrationButton as any).originalContent = this.registrationButton.textContent;

		this.expose("register");
	}

	/**
	 * Initiates the registration sequence
	 * @param login User's login
	 * @param password User's password
	 */
	public static register(
		login: string,
		password: string,
		confirmation: string
	): void {
		if (!login) {
			this.setStatus("Check Login");
			return;
		}

		if (!password || password !== confirmation) {
			this.setStatus("Check Password");
			return;
		}

		this.call("registered", login, password);
	}

	public static setStatus(status: string): void {
		if (!this.registrationButton) return;

		this.registrationButton.textContent = status;

		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			if (!this.registrationButton) return;

			this.registrationButton.textContent = (this
				.registrationButton as any).originalContent;
		}, 2000);
	}
}
