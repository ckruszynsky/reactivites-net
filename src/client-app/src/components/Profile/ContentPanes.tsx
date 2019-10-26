import React from 'react';
import { Tab } from 'semantic-ui-react';

export const ContentPanes = [
    {
        menuItem: 'About',
        render: () => <Tab.Pane>About Content</Tab.Pane>
    },
    {
        menuItem: 'Photos',
        render: () => <Tab.Pane>Photos Content</Tab.Pane>
    },
    {
        menuItem: 'Activities',
        render: () => <Tab.Pane>Activities Content</Tab.Pane>
    },
    {
        menuItem: 'Followers',
        render: () => <Tab.Pane>Followers Content</Tab.Pane>
    },
    {
        menuItem: 'Following',
        render: () => <Tab.Pane>Following Content</Tab.Pane>
    }
];
