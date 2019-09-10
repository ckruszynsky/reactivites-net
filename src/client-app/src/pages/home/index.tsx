import './styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';

import { PageHeader } from '../../components/PageHeader';

export const Home = () => {
  return (
    <Container className="homePageContainer">
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <PageHeader as="h2">Home</PageHeader>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <PageHeader as="h3">
              <Link to={"/activities"}>Activites</Link>
            </PageHeader>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
