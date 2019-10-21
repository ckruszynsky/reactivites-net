import {IActivity} from './../models/activity';
import {IUser} from './../models/user';

export const setActivityProps = (activity:IActivity, user:IUser) => {
    activity.date = new Date(activity.date);
    activity.isGoing = activity.attendees ? activity.attendees.some(a => a.username === user.username): false;
    activity.isHost =  activity.attendees ? activity.attendees.some(a => a.username === user.username && a.isHost): false;
    return activity;
}