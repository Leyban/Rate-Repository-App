import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (repositoryId) => {
  const response = useQuery(SINGLE_REPOSITORY,{
    // to avoid future caching problems
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId, first: 2, after: '' }
  })

  const { data, error, loading, fetchMore } = response

  const [repository, setRepository] = useState();

  const fetchRepository = async () => {
    setRepository(data.repository)
  };

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };



  useEffect(() => {
    if(!loading && data) {
      fetchRepository();
    }
  }, [loading, data]);

  return { repository, loading, refetch: fetchRepository, fetchMore: handleFetchMore };
};

export default useSingleRepository;