import "./scoreboard.scss";
import Template from "./scoreboard.pug";
import View from "../../../common/view.abstract";

/**
 * Scoreboard view
 */
export default class Scoreboard extends View {
	public constructor() {
		super("Scoreboard");

		this.template = Template;
	}
}
