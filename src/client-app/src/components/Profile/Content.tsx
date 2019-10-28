import React from 'react';
import {Tab} from 'semantic-ui-react';

import {IProfile} from '../../models/profile';
import {getContentPanes} from './ContentPanes';

const menuOptions = { fluid: true, vertical: true };

export const Content:React.FC<{profile:IProfile, isLoggedInUserProfile:boolean}> = ({profile,isLoggedInUserProfile}) => {
  return <Tab menu={menuOptions} menuPosition="right" panes={getContentPanes(profile, isLoggedInUserProfile)} />;
};
