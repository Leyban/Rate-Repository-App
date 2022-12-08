import { View, StyleSheet, Text, ScrollView, Button, Pressable } from 'react-native';
import Constants from 'expo-constants';
import React from 'react'
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
    flexDirection: 'row',
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
        <ScrollView horizontal >
            <Link to={'/'}><Text style={styles.text}>Repositories</Text></Link>
            <Link to={'/signIn'}><Text style={styles.text}>Sign In</Text></Link>
        </ScrollView>
    </View>;
};

export default AppBar;