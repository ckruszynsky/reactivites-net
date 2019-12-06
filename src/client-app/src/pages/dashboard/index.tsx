import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Button, Loader } from 'semantic-ui-react';

import { List } from '../../components/Activity';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { PageHeader } from '../../components/PageHeader';
import { RootStoreContext } from '../../stores/rootStore';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityFilters from '../../components/Activity/ActivityFilters';

export const Dashboard = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const {
    activitiesByDate
    ,setPage
    ,page
    ,totalPages
    ,loadActivities
    ,loading
    ,predicate
    ,setPredicate
  } = rootStore.activityStore;
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
            <PageHeader as="h1">Activities</PageHeader>
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
            <ActivityFilters
              predicate={predicate}
              setPredicate={setPredicate} />                              
          </Grid.Column>
          <Grid.Column width={10}>
            <Loader active={loadingNext} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
});
