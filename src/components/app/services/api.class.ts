import Loader from "../../common/loader.class";

/**
 * Handing all api calls
 */
export default class Api {
	private ip: string;
	private port: number;
	private UUID: string | null;
	private cachingUUID: boolean;

	/**
	 * Creates an api object
	 * @param ip Ip adress of the remote api
	 * @param port Port of the remote api
	 */
	public constructor(
		ip: string,
		port: number = 80,
		cachingUUID: boolean = true
	) {
		this.ip = ip;
		this.port = port;
		this.UUID = null;
		this.cachingUUID = cachingUUID;
	}

	/**
	 * Calls an api method
	 * @param method Method type
	 * @param data Data to send
	 * @param param Method params
	 */
	public async call(
		method: Method,
		data: object,
		param: string | null = null
	): Promise<IResponse> {
		//Resolve cached UUID
		if (this.cachingUUID && this.UUID) {
			(data as any)["UUID"] = this.UUID;
		}

		//Prepare url
		let url = `http://${this.ip}:${this.port}/${Method[method]}?${
			param ? "param=" + param + "&" : ""
		}${data ? "data=" + JSON.stringify(data) : ""}`;
		url = encodeURI(url);

		const loader = new Loader([url]);

		let response = (await loader.load())[0];
		if (!response) {
			return { success: false, data: {} };
		}

		if (typeof response === "string") {
			response = JSON.parse(response);
		}

		//Cache uuid on login
		if (response["Data"] && response["Data"]["UUID"]) {
			this.UUID = response["Data"]["UUID"];
		}

		return {
			success: (response["Answer"] as string).toLowerCase() === "success",
			data: response["Data"]
		};
	}

	/**
	 * Frees cached UUID
	 */
	public freeUUID(): void {
		this.UUID = null;
	}

	/**
	 * Manualy set uuid
	 * @param uuid New UUID
	 */
	public forceUUID(uuid: string): void {
		this.cachingUUID = true;
		this.UUID = uuid;
	}
}

export enum Method {
	"auth",
	"event",
	"task",
	"scoreboard",
	"registration"
}

export interface IResponse {
	success: boolean;
	data: any;
}
