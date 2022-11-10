import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import React from 'react'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
    backgroundColor: '#24292e'
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    padding: 10,
  }
});

const AppBar = () => {
  return <View style={styles.container}>
        <Text style={styles.text}>Repositories</Text>
    </View>;
};

export default AppBar;