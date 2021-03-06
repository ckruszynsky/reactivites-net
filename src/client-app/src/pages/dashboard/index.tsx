import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Loader } from 'semantic-ui-react';

import { List } from '../../components/Activity';
import { PageHeader } from '../../components/PageHeader';
import { RootStoreContext } from '../../stores/rootStore';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityFilters from '../../components/Activity/ActivityFilters';
import ActivityListItemPlaceholder from '../../components/Activity/ActivityListItemPlaceholder';

export const Dashboard = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadActivities,
    loading,
    setPage,
    page,
    totalPages
  } = rootStore.activityStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadActivities().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

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
            {loading && page === 0 ? <ActivityListItemPlaceholder /> : (
              <InfiniteScroll
             pageStart={0}
             loadMore={handleGetNext}
             hasMore={!loadingNext && page + 1 < totalPages}
             initialLoad={false}>
            <List />
            </InfiniteScroll>            
            )}
            
          </Grid.Column>
          <Grid.Column width={6}>            
            <ActivityFilters />                              
          </Grid.Column>
          <Grid.Column width={10}>
            <Loader active={loadingNext} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
});
