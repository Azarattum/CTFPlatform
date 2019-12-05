import "./login.scss";
import Template from "./login.pug";
import View from "../../../common/view.abstract";

/**
 * Login view
 */
export default class Login extends View {
	public constructor() {
		super("Login");

		this.template = Template;
	}
}
