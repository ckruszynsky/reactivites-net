import React from 'react';
import { Tab } from 'semantic-ui-react';

import { ContentPanes } from './ContentPanes';

const menuOptions = { fluid: true, vertical: true };

export const Content = () => {
  return <Tab menu={menuOptions} menuPosition="right" panes={ContentPanes} />;
};
