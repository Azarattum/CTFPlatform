import "./tasks.scss";
import Template from "./tasks.pug";
import View from "../../../common/view.abstract";

/**
 * Tasks view
 */
export default class Tasks extends View {
	public constructor() {
		super("Tasks");

		this.template = Template;
	}
}
