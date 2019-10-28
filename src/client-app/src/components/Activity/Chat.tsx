import React, {Fragment, StyleHTMLAttributes} from 'react';
import {Button, Comment, Form, Header, Icon, Segment} from 'semantic-ui-react';

import {IActivity} from '../../models';

const HeaderStyle= {
   backgroundColor:'#2D3047',
   border:'none'
};

export const Chat: React.FC<{ activity: IActivity }> = ({ activity }) => {
  return (
    <Fragment>
      <Segment textAlign="center" attached="top" inverted style={HeaderStyle}>
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src="/assets/user.png" />
            <Comment.Content>
              <Comment.Author as="a">Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Comment>
            <Comment.Avatar src="/assets/user.png" />
            <Comment.Content>
              <Comment.Author as="a">Joe Henderson</Comment.Author>
              <Comment.Metadata>
                <div>5 days ago</div>
              </Comment.Metadata>
              <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Form reply>
            <Form.TextArea />
            <Button animated color="pink">
              <Button.Content visible>
                  Reply
              </Button.Content>
              <Button.Content hidden>
                  <Icon name="reply" />
              </Button.Content>
            </Button>
          </Form>
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};
