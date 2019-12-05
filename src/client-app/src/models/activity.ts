export interface IActivity {
	id: string;
	title: string;
	description: string;
	category: string;
	date: Date;
	city: string;
	venue: string;
	attendees: Array<IAttendee>;
	comments: IComment[];
	isGoing?: boolean;
	isHost?: boolean;
}

export interface IComment {
	id: string;
	createdAt: Date;
	body: string;
	username: string;
	displayName: string;
	image: string;
}

export interface IActivityFormValues extends Partial<IActivity> {
	time?: Date;
}

export interface IAttendee {
	username: string;
	displayName: string;
	image: string;
	isHost: boolean;
	following?: boolean;
}

export class ActivityFormValues implements IActivityFormValues {
	id?: string = undefined;
	title: string = '';
	category: string = '';
	description: string = '';
	date?: Date = undefined;
	time?: Date = undefined;
	city: string = '';
	venue: string = '';

	constructor(activity?: IActivityFormValues) {
		if (activity && activity.date) {
			activity.time = activity.date;
		}
		Object.assign(this, activity);
	}
}
