import Service from "../../../common/service.abstract";

export default class Login extends Service<"logined">() {
	private static loginField: HTMLInputElement | null = null;
	private static passwordField: HTMLInputElement | null = null;
	private static loginButton: HTMLButtonElement | null = null;

	private static timeout: NodeJS.Timeout;

	/**
	 * Initializes login controller
	 */
	public static initialize(): void {
		const loginField = document.getElementById("login-field");
		const passwordField = document.getElementById("password-field");
		const loginButton = document.getElementById("login-button");
		if (!loginField || !passwordField || !loginButton) {
			throw new Error("Containers for login not found!");
		}

		this.loginField = loginField as HTMLInputElement;
		this.passwordField = passwordField as HTMLInputElement;
		this.loginButton = loginButton as HTMLButtonElement;

		(this
			.loginButton as any).originalContent = this.loginButton.textContent;

		loginButton.addEventListener("click", () => {
			if (!this.loginField || !this.passwordField || !this.loginButton) {
				return;
			}

			this.call(
				"logined",
				this.loginField.value,
				this.passwordField.value
			);
		});
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
