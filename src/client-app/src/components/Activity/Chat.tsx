import {formatDistance} from 'date-fns';
import React, {Fragment} from 'react';
import {Field, Form as FinalForm} from 'react-final-form';
import {Button, Comment, Form, Header, Segment} from 'semantic-ui-react';

import {IActivity} from '../../models';
import {Link} from '../../util/router';
import {TextAreaInput} from '../Form';

const HeaderStyle= {
   backgroundColor:'#2D3047',
   border:'none'
};

export const Chat:React.FC<{activity:IActivity, addComment: (value:any) => Promise<void> }> = ({activity,addComment}) => {
  
  return (
    <Fragment>
    <Segment
      textAlign='center'
      attached='top'
      inverted
      color='teal'
      style={{ border: 'none' }}
    >
      <Header>Chat about this event</Header>
    </Segment>
    <Segment attached>
      <Comment.Group>
        {activity && activity.comments && activity.comments.map((comment) => (
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
              primary
            />
          </Form>
          )}
        />

      </Comment.Group>
    </Segment>
  </Fragment>
  );
};
