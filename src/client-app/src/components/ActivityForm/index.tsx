import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

export const ActivityForm:React.FC<{
    onSetEditMode:(editMode:boolean)=> void;

}> = ({onSetEditMode}) => {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' />
                <Form.TextArea rows={2} placeholder='Description' />
                <Form.Input placeholder='Category' />
                <Form.Input type='date' placeholder='Date' />
                <Form.Input placeholder='City' />
                <Form.Input placeholder='Venue' />  
                <Button floated='right' positive type="submit" content="Submit" />
                <Button floated='right' content='Cancel' onClick={()=> onSetEditMode(false)} />
            </Form>
        </Segment>
    )
}


