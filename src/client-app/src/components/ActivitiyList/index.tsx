import './styles.scss';

import React, {Fragment} from 'react';
import {Item, Label, Segment} from 'semantic-ui-react';

import {IActivity} from '../../models';
import {ActivityListItem} from '../ActivityListItem';

interface ActivityListProps {
  activities: [string, IActivity[]][];
}
export const ActivityList: React.FC<ActivityListProps> = ({
  activities
}) => {
  return (
    <Fragment>
      {activities.map(([group, acts]) => (
        <Fragment key={group}>

          <Label size='large' color='blue'>
            {group}
          </Label>
          <Segment clearing>
            <Item.Group divided>
              {acts.map((activity: IActivity) => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}

    </Fragment>
  );
};
