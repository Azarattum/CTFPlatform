/**Utils */
import Manager, { IComponent } from "../common/manager.class";
import View from "../common/view.abstract";
import Api, { Method } from "./services/api.class";
/**Services */
/**Views */

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
		const components: IComponent[] = [];

		const views: View[] = [];

		this.manger = new Manager(components, views);

		const args = await this.initializeArguments();

		await this.manger.initialize(args);

		const test = new Api("90.189.168.29", 13451);
		(window as any).test = test;
		console.log(test);
		const r = await test.call(Method.scoreboard, {
			id_event: 2
		});
		console.log(r);
	}

	/**
	 * Initializes arguments for the manager
	 */
	private async initializeArguments(): Promise<{
		[component: string]: any[];
	}> {
		if (!this.manger) {
			throw new Error("Initialize manager first!");
		}

		return {};
	}
}
