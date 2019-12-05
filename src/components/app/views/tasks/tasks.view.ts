import "./tasks.scss";
import Template from "./tasks.pug";
import View from "../../../common/view.abstract";
import TasksController from "../../controllers/tasks/tasks.controller";
import TasksService from "../../services/tasks.service";

/**
 * Tasks view
 */
export default class Tasks extends View {
	public constructor() {
		super("Tasks");

		this.template = Template;
	}

	public toggle(visible?: boolean | null): void {
		super.toggle(visible);

		if (visible) {
			const tasks = TasksService.getTasks();
			tasks.then(tasks => {
				TasksController.renderTasks(tasks);
			});

			const name = TasksService.getUsername();
			name.then(name => {
				const container = document.getElementById("username");
				if (container) {
					container.textContent = name;
				}
			});
		}
	}
}
