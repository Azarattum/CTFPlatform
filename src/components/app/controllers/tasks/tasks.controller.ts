import Task, { Category } from "../../models/task.class";
import Service from "../../../common/service.abstract";

export default class Tasks extends Service<"">() {
	private static containers: {
		[category: string]: HTMLElement;
	} | null = null;
	/**
	 * Initializes tasks controller
	 */
	public static initialize(): void {
		this.containers = {};

		for (const category of Object.keys(Category).filter(
			x => !Number.isInteger(+x)
		)) {
			const container = document.getElementById(category + "-tasks-list");

			if (!container) {
				throw new Error(
					"Container for " + category + " tasks not found!"
				);
			}
			this.containers[category] = container;
		}

		this.expose("showCategory");
		this.showCategory(Category[0]);
	}

	public static renderTasks(tasks: Task[]): void {
		if (!this.containers) return;

		for (const task of tasks) {
			const container = this.containers[Category[task.category]];

			const wrapper = document.createElement("div");
			wrapper.classList.add("task");

			const name = document.createElement("div");
			name.classList.add("name");
			name.textContent = task.name;

			const points = document.createElement("div");
			points.classList.add("points");
			points.textContent = task.points.toString();

			const link = document.createElement("a");
			link.classList.add("link");
			if (task.link) {
				link.target = "_blank";
				link.textContent = task.link.href;
				link.href = task.link.href;
			}

			const description = document.createElement("div");
			description.classList.add("description");
			description.innerHTML = task.description;

			const input = document.createElement("input");
			input.type = "text";

			const button = document.createElement("button");
			button.innerHTML = "&#10004;&#65039;";

			wrapper.appendChild(name);
			if (task.link) {
				wrapper.appendChild(link);
			}
			wrapper.appendChild(description);
			wrapper.appendChild(input);
			wrapper.appendChild(button);
			wrapper.appendChild(points);

			container.appendChild(wrapper);
		}
	}

	public static showCategory(name: string): void {
		if (!this.containers) return;

		for (const container of Object.values(this.containers)) {
			container.style.display = "none";
		}

		this.containers[name].style.display = "block";
	}
}
