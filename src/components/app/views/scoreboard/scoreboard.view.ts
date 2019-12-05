import "./scoreboard.scss";
import Template from "./scoreboard.pug";
import View from "../../../common/view.abstract";
import ScoreboardService from "../../services/scoreboard.service";
import ScoreboardController from "../../controllers/scoreboard/scoreboard.controller";
import TasksService from "../../services/tasks.service";

/**
 * Scoreboard view
 */
export default class Scoreboard extends View {
	public constructor() {
		super("Scoreboard");

		this.template = Template;
	}

	public toggle(visible?: boolean | null): void {
		super.toggle(visible);

		if (visible) {
			const scoreboard = ScoreboardService.getScoreboard();
			scoreboard.then(scoreboard => {
				ScoreboardController.renderScoreboard(scoreboard);

				const name = TasksService.getUsername();
				name.then(name => {
					if (!name) return;

					const elements = document.getElementsByTagName("td");
					for (const element of elements) {
						if (element.textContent == name) {
							const parent = element.parentElement;
							if (parent) {
								parent.classList.add("gradient-border");
							}
							break;
						}
					}
				});
			});
		}
	}
}
