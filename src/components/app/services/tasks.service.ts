import Service from "../../common/service.abstract";
import Api, { Method } from "./api.class";
import Task from "../models/task.class";
import Event from "../models/event.calss";

/**
 * Service for managing tasks
 */
export default class Tasks extends Service<"">() {
	private static api: Api | null = null;
	private static event: Event | null = null;

	private static cache: Task[] | null = null;

	public static initialize(api: Api): void {
		this.api = api;
	}

	public static async getTasks(): Promise<Task[]> {
		if (this.cache) return this.cache;
		if (!this.api) return [];
		if (!this.event) {
			const eventData = await this.api.call(Method.event, {
				Name: "",
				Page: 0
			});
			if (!eventData.success) {
				throw new Error("Unable to load event!");
			}

			this.event = new Event(
				+eventData.data[0].id_event,
				eventData.data[0].date_end
			);
		}

		const tasksData = await this.api.call(Method.task, {
			id_event: this.event.id
		});

		if (!tasksData.success) {
			throw new Error("Unable to load tasks!");
		}

		const tasks: Task[] = [];
		for (const task of tasksData.data) {
			tasks.push(
				new Task(
					task.id_task,
					task.task_name,
					task.task_category,
					task.task_point,
					task.close,
					task.task_description,
					task.task_link
				)
			);
		}

		this.cache = tasks;
		return tasks;
	}
}
