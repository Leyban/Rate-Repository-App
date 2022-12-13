import React, { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#ddd'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;


export const RepositoryListContainer = ({repositories}) => {
  const navigate = useNavigate()

  const onPress = (id) => {
    console.log('item pressed', id)
    navigate(`/single/${id}`)
  }

  const repositoryNodes = repositories 
    ? repositories.edges.map(edge => edge.node)
    : []

  const renderItem = ({ item }) => {
    return (
    <Pressable onPress={() => onPress(item.id)}>
      <RepositoryItem {...item}/>
    </Pressable>
    )
  }

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem ={renderItem}
      keyExtractor={item => item.id}
    />
  );
}

const RepositoryList = () => {
  const { repositories } = useRepositories()

  return <RepositoryListContainer repositories={repositories} />
};

export default RepositoryList;