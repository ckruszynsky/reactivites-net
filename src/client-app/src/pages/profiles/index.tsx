import './styles.scss';

import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Container, Grid} from 'semantic-ui-react';

import {RootStoreContext} from '../../stores/rootStore';

interface ProfileParams {
  username: string;
}

export const Profile: React.FC<RouteComponentProps<ProfileParams>> = observer(
  ({match}) => {
    const rootStore = useContext(RootStoreContext);
    
    return (
      <Container className="detailsContainer">
        <Grid>
            <h1>Profile Page</h1>         
        </Grid>
      </Container>
    );
  }
);
