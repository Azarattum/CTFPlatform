/**Utils */
import Manager, { IComponent } from "../common/manager.class";
import View from "../common/view.abstract";
import { Category } from "./models/task.class";
import Api from "./services/api.class";
/**Services */
import LoginController from "./controllers/login/login.controller";
import TasksController from "./controllers/tasks/tasks.controller";
import ScoreboardController from "./controllers/scoreboard/scoreboard.controller";
import Events from "./services/events.service";
import Tasks from "./services/tasks.service";
import Scoreboard from "./services/scoreboard.service";
import Tabs from "../common/tabs.service";
/**Views */
import LoginView from "./views/login/login.view";
import TasksView from "./views/tasks/tasks.view";
import BackgroundView from "./views/background/background.view";
import ScoreboardView from "./views/scoreboard/scoreboard.view";
import Hash from "../common/hash.service";

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
			ScoreboardController,
			Tabs,
			Tasks,
			Scoreboard,
			Events,
			Hash
		];

		const views: View[] = [
			new LoginView(),
			new TasksView(),
			new ScoreboardView(),
			new BackgroundView()
		];

		this.manger = new Manager(components, views);

		const argsComp = await this.generateComponetArguments(api);
		const argsView = await this.generateViewArguments();

		await this.manger.initialize(argsComp, argsView);

		Tabs.change("Login");
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
			Scoreboard: [api],
			Tabs: [
				[
					this.manger.getView("Login"),
					this.manger.getView("Tasks"),
					this.manger.getView("Scoreboard")
				]
			]
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
