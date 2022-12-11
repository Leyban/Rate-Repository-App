import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES,{
    // to avoid future caching problems
    fetchPolicy: 'cache-and-network',
  })

  const [repositories, setRepositories] = useState();

  const fetchRepositories = async () => {
    setRepositories(data.repositories)
  };

  useEffect(() => {
    if(!loading && data) {
      fetchRepositories();
    } 
  }, [loading]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;