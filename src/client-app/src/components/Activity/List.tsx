import {format} from 'date-fns';
import React, {Fragment} from 'react';
import {Item, Label} from 'semantic-ui-react';

import {IActivity} from '../../models';
import {ListItem} from './ListItem';


interface ListProps {
  activities: [string, IActivity[]][];
}
export const List: React.FC<ListProps> = ({
  activities
}) => {
  return (
    <Fragment>
      {activities.map(([group, acts]) => (
        <Fragment key={group}>
          <Label size='large' style={{backgroundColor:'#2D3047', color:'#fff'}}>
            {format(group, 'eeee, MMMM do')}
          </Label>
          <Item.Group divided>
            {acts.map((activity: IActivity) => (
              <ListItem key={activity.id} activity={activity} />
            ))}
          </Item.Group>
        </Fragment>
      ))}

    </Fragment>
  );
};
