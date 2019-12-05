/**Utils */
import Manager, { IComponent } from "../common/manager.class";
import View from "../common/view.abstract";
import { Category } from "./models/task.class";
import Api from "./services/api.class";
/**Services */
import LoginController from "./controllers/login/login.controller";
import TasksController from "./controllers/tasks/tasks.controller";
import Events from "./services/events.service";
import Tasks from "./services/tasks.service";
/**Views */
import LoginView from "./views/login/login.view";
import TasksView from "./views/tasks/tasks.view";
import BackgroundView from "./views/background/background.view";
import Tabs from "../common/tabs.service";

/**
 * Main application class
 */
export default class App {
	private manger: Manager | null = null;

	/**
	 * Initializes the app.
	 * Note that the page should be already loaded
	 */
	public async initialize(): Promise<void> {
		const api = new Api("90.189.168.29", 13451);

		const components: IComponent[] = [
			LoginController,
			TasksController,
			Tabs,
			Tasks,
			Events
		];

		const views: View[] = [
			new LoginView(),
			new TasksView(),
			new BackgroundView()
		];

		this.manger = new Manager(components, views);

		const argsComp = await this.generateComponetArguments(api);
		const argsView = await this.generateViewArguments();

		await this.manger.initialize(argsComp, argsView);

		//Restore session
		const session = document.cookie
			.split(";")
			.find(x => x.split("=")[0] == "session");
		if (session) {
			api.forceUUID(session.split("=")[1]);
			Tabs.change("Tasks");
		} else {
			Tabs.change("Login");
		}
	}

	/**
	 * Initializes arguments for the manager
	 */
	private async generateComponetArguments(
		api: Api
	): Promise<{
		[component: string]: any[];
	}> {
		if (!this.manger) {
			throw new Error("Initialize manager first!");
		}

		return {
			Events: [api],
			Tasks: [api],
			Tabs: [[this.manger.getView("Login"), this.manger.getView("Tasks")]]
		};
	}

	/**
	 * Initializes arguments for the manager
	 */
	private async generateViewArguments(): Promise<{
		[component: string]: {};
	}> {
		if (!this.manger) {
			throw new Error("Initialize manager first!");
		}

		return {
			Tasks: {
				categories: Object.keys(Category)
					.filter(x => !Number.isInteger(+x))
					.map(x => x.replace(/.{1}/, x.charAt(0).toUpperCase()))
			}
		};
	}
}
