import './styles.scss';

import React, {SyntheticEvent} from 'react';
import {Item} from 'semantic-ui-react';

import {IActivity} from '../../models';
import {ActivityListItem} from '../ActivityListItem';

interface ActivityListProps {
  activities: IActivity[];
  onDelete: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  target: string;
  submitting: boolean;
}
export const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  onDelete,
  target,
  submitting
}) => {
  return (
    <Item.Group divided>
      {activities.map((activity: IActivity) => (
        <ActivityListItem key={activity.id} activity={activity} />
      ))}
    </Item.Group>
  );
};
