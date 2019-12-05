import "./background.scss";
import Template from "./background.pug";
import View from "../../../common/view.abstract";

/**
 * Background view
 */
export default class Background extends View {
	public constructor() {
		super("Background");

		this.template = Template;
	}
}
