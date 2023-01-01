import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [orderSettings, setOrderSettings] = useState({
    orderBy: "CREATED_AT",
    orderDirection: "DESC"
  });
  const [selectedOrder, setSelectedOrder] = useState('Latest repositories')

  const { data, error, loading } = useQuery(GET_REPOSITORIES,{
    // to avoid future caching problems
    fetchPolicy: 'cache-and-network',
    variables: orderSettings
  })

  const changeOrder = (order) => {
    if (order === 'Latest repositories'){
      setOrderSettings({
        orderBy: "CREATED_AT",
        orderDirection: "DESC"
      })
      setSelectedOrder('Latest repositories')
    } else if (order === 'Highest rated repositories') {
      setOrderSettings({
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC"
      })
      setSelectedOrder('Highest rated repositories')
    } else if (order === 'Lowest rated repositories') {
      setOrderSettings({
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC"
      })
      setSelectedOrder('Lowest rated repositories')
    }
  }


  const [repositories, setRepositories] = useState();

  const fetchRepositories = async () => {
    setRepositories(data.repositories)
  };

  useEffect(() => {
    if(!loading && data) {
      fetchRepositories();
    } 
  }, [loading]);

  return { repositories, loading, refetch: fetchRepositories, changeOrder, selectedOrder };
};

export default useRepositories;