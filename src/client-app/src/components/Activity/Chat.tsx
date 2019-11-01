import {formatDistance} from 'date-fns';
import {observer} from 'mobx-react-lite';
import React, {Fragment, useContext, useEffect} from 'react';
import {Field, Form as FinalForm} from 'react-final-form';
import {Button, Comment, Form, Header, Segment} from 'semantic-ui-react';

import {RootStoreContext} from '../../stores/rootStore';
import {Link} from '../../util/router';
import {TextAreaInput} from '../Form';

const HeaderStyle= {
   backgroundColor:'#2D3047',
   border:'none'
};

export const Chat = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const {
    createHubConnection,
    stopHubConnection,
    addComment,
    currentActivity
  } = rootStore.activityStore;

  useEffect(() => {
    createHubConnection();
    return () => {
      stopHubConnection();
    }
  }, [createHubConnection, stopHubConnection])

  return (
    <Fragment>
    <Segment
      textAlign='center'
      attached='top'
      inverted      
      style={HeaderStyle}
    >
      <Header>Chat about this event</Header>
    </Segment>
    <Segment attached>
      <Comment.Group>
        {currentActivity && currentActivity.comments && currentActivity.comments.map((comment) => (
        <Comment key={comment.id}>
        <Comment.Avatar src={comment.image || '/assets/user.png'} />
        <Comment.Content>
          <Comment.Author as={Link} to={`/profile/${comment.username}`}>{comment.displayName}</Comment.Author>
          <Comment.Metadata>
            <div>{formatDistance(comment.createdAt, new Date())}</div>
          </Comment.Metadata>
          <Comment.Text>{comment.body}</Comment.Text>
        </Comment.Content>
      </Comment>
        ))}

        <FinalForm 
          onSubmit={addComment}
          render={({handleSubmit, submitting, form}) => (
            <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
            <Field 
              name='body'
              component={TextAreaInput}
              rows={2}
              placeholder='Add your comment'
            />
            <Button
              loading={submitting}
              content='Add Reply'
              labelPosition='left'
              icon='edit'
              color="pink"
            />
          </Form>
          )}
        />

      </Comment.Group>
    </Segment>
  </Fragment>
  );
});
