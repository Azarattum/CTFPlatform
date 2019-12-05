/**
 * Represents a task
 */
export default class Task {
	public id: number;
	public name: string;
	public category: Category;
	public points: number;
	public solved: boolean;
	public description: string;
	public link: URL | null;

	/**
	 * Creates a task object
	 */
	public constructor(
		id: number,
		name: string,
		category: Category | string,
		points: number = 0,
		solved: boolean = false,
		description: string = "",
		link: string = ""
	) {
		this.id = id;
		this.name = name;
		this.points = points;
		this.solved = solved;
		this.description = description;
		try {
			this.link = new URL(link);
		} catch {
			this.link = null;
		}
		this.category =
			typeof category === "string"
				? ((Category[category as any] as unknown) as Category)
				: (category as Category);
	}
}

/**
 * Enum of available task categories
 */
export enum Category {
	"admin",
	"crypto",
	"exploit",
	"forensic",
	"joy",
	"ppc",
	"pwn",
	"reverse",
	"stegano",
	"web"
}
