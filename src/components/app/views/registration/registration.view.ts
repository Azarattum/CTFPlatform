import Template from "./registration.pug";
import View from "../../../common/view.abstract";

/**
 * Login view
 */
export default class Registration extends View {
	public constructor() {
		super("registration");

		this.template = Template;
	}
}
