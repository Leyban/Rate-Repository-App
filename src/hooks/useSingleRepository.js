import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (repositoryId) => {
  const response = useQuery(SINGLE_REPOSITORY,{
    // to avoid future caching problems
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId }
  })

  const { data, error, loading } = response

  const [repository, setRepository] = useState();

  const fetchRepository = async () => {
    setRepository(data.repository)
  };

  useEffect(() => {
    if(!loading && data) {
      fetchRepository();
    }
  }, [loading]);

  return { repository, loading, refetch: fetchRepository };
};

export default useSingleRepository;