import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Button, Loader } from 'semantic-ui-react';

import { List } from '../../components/Activity';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { PageHeader } from '../../components/PageHeader';
import { RootStoreContext } from '../../stores/rootStore';
import InfiniteScroll from 'react-infinite-scroller';

export const Dashboard = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const {loadActivities,loading} = rootStore.activityStore;
  const {activitiesByDate, setPage,page,totalPages} = rootStore.activityStore;
  const [loadingNext,setLoadingNext] = useState(false);
  
  const  handleGetNext = () => {
    setLoadingNext(true);
    setPage(page+1);
    loadActivities().then(()=> setLoadingNext(false));
  }

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loading && page ===0) {
    return <LoadingIndicator content="Loading activities...." inverted={true} />;
  }

  return (
    <Container className="dashboardContainer">
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <PageHeader as="h2">Activity Dashboard</PageHeader>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <InfiniteScroll
             pageStart={0}
             loadMore={handleGetNext}
             hasMore={!loadingNext && page + 1 < totalPages}
             initialLoad={false}>
            <List activities={activitiesByDate} />
            </InfiniteScroll>            
          </Grid.Column>
          <Grid.Column width={6}>
            <h2>Activity Filters</h2>
          </Grid.Column>
          <Grid.Column width={10}>
            <Loader active={loadingNext} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
});
