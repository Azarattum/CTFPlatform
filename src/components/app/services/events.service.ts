import Service from "../../common/service.abstract";
import Api, { Method } from "./api.class";
import Login from "../controllers/login.controller";
import Tabs from "../../common/tabs.service";
import Tasks from "../controllers/tasks.controller";
import Hash from "../../common/hash.service";
import Registration from "../controllers/registration.controller";

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
	 * Register Login and Registration service events
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

		Registration.addEventListener(
			"registered",
			async (login: string, password: string) => {
				const result = await this.api.call(Method.registration, {
					Login: login,
					Password: password,
					//Empty params just for the sake of API
					Name: login,
					Email: "",
					Sex: "",
					City: "",
					Educational: "",
					Logo_name: "0",
					Logo: "0"
				});

				if (!result.success) {
					Registration.setStatus("Try Again");
				} else {
					document.cookie = "session=" + result.data.UUID;
					Login.setStatus("Loading...");
					Tabs.change("Tasks");

					//Fetch current event data
					const eventData = await this.api.call(Method.event, {
						Name: "",
						Page: 0
					});
					if (!eventData.success) {
						throw new Error("Unable to load event!");
					}

					//Register user to an event
					this.api.call(
						Method.event,
						{
							official: true,
							id_event: +eventData.data[0].id_event
						},
						"reg_user"
					);
				}
			}
		);
	}

	/**
	 * Register Tasks service events
	 */
	private static registerTasks(): void {
		Tasks.addEventListener("logouted", () => {
			this.api.freeUUID();
			document.cookie = "session=";
			Tabs.change("login");
		});

		Tasks.addEventListener("categorychanged", (name: string) => {
			Hash.set("category", name);
			const elements = document.getElementsByClassName("category");
			for (const element of elements) {
				element.classList.remove("selected");
				if (
					element.textContent &&
					element.textContent.toLowerCase() == name
				) {
					element.classList.add("selected");
				}
			}
		});
	}

	/**
	 * Register Tabs service events
	 */
	private static registerTabs(): void {
		Tabs.addEventListener("tabchanged", (tab: string) => {
			const session = document.cookie
				.split(";")
				.find(x => x.split("=")[0].trim() == "session");

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
