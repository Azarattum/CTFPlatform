import TasksService from "../services/tasks.service";
import Task, { Category } from "../models/task.class";
import Service from "../../common/service.abstract";

export default class Tasks extends Service<"logouted" | "categorychanged">() {
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
		this.expose("submitFlag");
		this.expose("logout");
		this.showCategory(Category[0]);
	}

	/**
	 * Renders an array of tasks on the page
	 * @param tasks Task array
	 */
	public static renderTasks(tasks: Task[]): void {
		if (!this.containers) return;

		for (const container of Object.values(this.containers)) {
			container.innerHTML = "";
		}

		for (const task of tasks) {
			const container = this.containers[Category[task.category]];

			const wrapper = document.createElement("div");
			wrapper.classList.add("task");
			wrapper.id = "task-" + task.id;
			if (task.solved) {
				wrapper.classList.add("solved");
			}

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
				link.textContent = "CLICK ME";
				link.href = task.link.href;
			}

			const description = document.createElement("div");
			description.classList.add("description");
			description.innerHTML = task.description;

			const input = document.createElement("input");
			input.addEventListener("animationend", () => {
				input.classList.remove("apply-shake");
			});
			input.type = "text";
			input.placeholder = "ELON{\\S+}";
			input.pattern = "ELON\\{\\S+\\}";

			const button = document.createElement("button");
			button.innerHTML = "&#10004;&#65039;";
			button.onclick = (): void => {
				this.submitFlag(task.id, input.value);
			};

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

	/**
	 * Shows specified category
	 * @param name Category name
	 */
	public static showCategory(name: string): void {
		if (!this.containers) return;

		for (const container of Object.values(this.containers)) {
			container.style.display = "none";
		}

		this.containers[name].style.display = "block";

		this.call("categorychanged", name);
	}

	/**
	 * Submits flag to backend
	 * @param id Task id
	 * @param flag Flag to submit
	 */
	public static async submitFlag(id: number, flag: string): Promise<void> {
		const solved = await TasksService.submitFlag(id, flag);

		const task = document.getElementById("task-" + id);
		if (!task) return;

		if (solved) {
			(task as HTMLElement).classList.add("solved");
		} else {
			const input = task.querySelector("input");
			(input as HTMLInputElement).value = "";
			if (input) {
				input.classList.add("apply-shake");
			}
		}
	}

	/**
	 * Calls logout event
	 */
	public static logout(): void {
		this.call("logouted");
	}
}
