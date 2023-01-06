import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useDebounce } from 'use-debounce';

const useRepositories = () => {
  const [orderSettings, setOrderSettings] = useState({
    orderBy: "CREATED_AT",
    orderDirection: "DESC"
  });
  const [selectedOrder, setSelectedOrder] = useState('Latest repositories')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [debouncedKeyword] = useDebounce(searchKeyword, 500)

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES,{
    // to avoid future caching problems
    fetchPolicy: 'cache-and-network',
    variables: {
      ...orderSettings, 
      searchKeyword:debouncedKeyword, 
      first: 4,
      after: ''
    }
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

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
      },
    });
  };

  useEffect(() => {
    if(!loading && data) {
      fetchRepositories();
    } 
  }, [loading, data]);

  return { 
    repositories, 
    loading, 
    refetch: fetchRepositories, 
    fetchMore: handleFetchMore,
    changeOrder, 
    selectedOrder, 
    searchKeyword,
    setSearchKeyword 
  };
};

export default useRepositories;