import Service from "../../common/service.abstract";
import Api, { Method } from "./api.class";
import Login from "../controllers/login/login.controller";
import Tabs from "../../common/tabs.service";

/**
 * One service to rule them all!
 * Registers and manages event-driven communication
 * among all services
 */
export default class Events extends Service<"registered">() {
	private static api: Api;

	public static async initialize(api: Api): Promise<void> {
		this.api = api;
		//Register service events
		this.registerLogin();

		this.call("registered");
	}

	/**
	 * Register Users service events
	 */
	private static registerLogin(): void {
		Login.addEventListener(
			"logined",
			async (login: string, password: string) => {
				const result = await this.api.call(Method.auth, {
					Login: login,
					Password: password
				});

				if (!result.success) {
					Login.setStatus("Try Again");
				} else {
					document.cookie = "session=" + result.data.UUID;
					Login.setStatus("Loading...");
					Tabs.change("Tasks");
				}
			}
		);
	}
}
