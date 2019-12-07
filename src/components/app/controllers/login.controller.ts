import Service from "../../common/service.abstract";

export default class Login extends Service<"logined">() {
	private static loginButton: HTMLButtonElement | null = null;

	private static timeout: NodeJS.Timeout;

	/**
	 * Initializes login controller
	 */
	public static initialize(): void {
		const loginButton = document.getElementById("login-button");
		if (!loginButton) {
			throw new Error("Login button not found!");
		}

		this.loginButton = loginButton as HTMLButtonElement;

		(this
			.loginButton as any).originalContent = this.loginButton.textContent;

		this.expose("login");
	}

	/**
	 * Initiates the login sequence
	 * @param login User's login
	 * @param password User's password
	 */
	public static login(login: string, password: string): void {
		this.call("logined", login, password);
	}

	public static setStatus(status: string): void {
		if (!this.loginButton) return;

		this.loginButton.textContent = status;

		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			if (!this.loginButton) return;

			this.loginButton.textContent = (this
				.loginButton as any).originalContent;
		}, 2000);
	}
}
