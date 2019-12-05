import Service from "../../common/service.abstract";
import Api, { Method } from "./api.class";
import Login from "../controllers/login/login.controller";
import Tabs from "../../common/tabs.service";
import Tasks from "../controllers/tasks/tasks.controller";
import Hash from "../../common/hash.service";

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
		this.registerTasks();
		this.registerTabs();
		this.registerHash();

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

	/**
	 * Register Tasks service events
	 */
	private static registerTasks(): void {
		Tasks.addEventListener("logouted", () => {
			document.cookie = "session=";
			Tabs.change("login");
		});

		Tasks.addEventListener("categorychanged", (name: string) => {
			Hash.set("category", name);
		});
	}

	/**
	 * Register Tabs service events
	 */
	private static registerTabs(): void {
		Tabs.addEventListener("tabchanged", (tab: string) => {
			const session = document.cookie
				.split(";")
				.find(x => x.split("=")[0] == "session");

			//Auto authorization
			if (tab.toLowerCase() == "login") {
				if (session && session.split("=")[1]) {
					this.api.forceUUID(session.split("=")[1]);
					Tabs.change("Tasks");
				}
			} else if (tab.toLowerCase() == "tasks") {
				if (!session || !session.split("=")[1]) {
					Tabs.change("Login");
				}
			}
		});
	}

	/**
	 * Register Hash service events
	 */
	private static registerHash(): void {
		Hash.addEventListener(
			"loaded",
			(properties: { [name: string]: string }) => {
				if (Hash.exists("category")) {
					Tasks.showCategory(Hash.get("category") || "");
				}
			}
		);
	}
}
