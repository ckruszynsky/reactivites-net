import {AxiosResponse} from 'axios';
import React from 'react';
import {Message} from 'semantic-ui-react';

interface IErrorProps {
    error: AxiosResponse,
    text?: string
}

export const ErrorMessage: React.FC<IErrorProps> = ({error, text}) => {
    return (
        <Message error>
            <Message.Header>{error.statusText}</Message.Header>
            {text && <Message.Content content={text} />}
        </Message>
    )
}
