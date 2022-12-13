import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Navigate, Route, Routes, useParams } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import AppBar from './AppBar';
import RepositoryItem from './RepositoryItem';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#ddd'
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} exact />
        <Route path='/single/:repoId' element={<SingleRepository />} />
        <Route path='/signIn' element={<SignIn />} exact />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;