import React from 'react';
import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from 'semantic-ui-react';

import {IProfile} from '../../models/profile';

export const ProfileHeader:React.FC<{profile:IProfile}> = ({profile}) => {
  return (
    <Segment>
      <Grid columns={2} stackable>
        <Grid.Row>
        <Grid.Column width={11}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={ profile.image || '/assets/user.png'}
              />
              <Item.Content verticalAlign='middle'>
                <Header as='h1'>{profile.displayName}</Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic label='Followers' value={profile.followersCount}/>
            <Statistic label='Following' value={profile.followingCount}/>
          </Statistic.Group>
          <Divider/>
          <Reveal animated='move'>
            <Reveal.Content visible style={{ width: '100%' }}>
              <Button
                fluid                
                color='green'
                content='Following'
              />
            </Reveal.Content>
            <Reveal.Content hidden>
              <Button
                fluid
                basic
                color={true ? 'purple' : 'pink'}
                content={true ? 'Unfollow' : 'Follow'}
              />
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};


