import React from 'react';
import {Tab} from 'semantic-ui-react';

import {getContentPanes} from './ContentPanes';
import {IProfileContentProps} from './IProfileContentProps';

const menuOptions = { fluid: true, vertical: true };

export const Content:React.FC<IProfileContentProps> = ({
    profile,
    isLoggedInUserProfile,
    uploadPhoto,
    uploadingPhoto,
    setMainPhoto,
    deletePhoto,
    loading,
    updateProfile,
    followings,
    setActiveTab,
    activeTab
  }) => {
  return <Tab 
          onTabChange={(e,data)=> setActiveTab(data.activeIndex)}
          menu={menuOptions} 
          menuPosition="right" 
          panes={getContentPanes(
                  profile, 
                  isLoggedInUserProfile, 
                  uploadPhoto, 
                  uploadingPhoto,
                  setMainPhoto,
                  deletePhoto,                  
                  updateProfile,
                  loading,
                  followings,
                  activeTab          
                  )}
        />;
};
