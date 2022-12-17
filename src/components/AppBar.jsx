import { View, StyleSheet, Text, ScrollView, Button, Pressable } from 'react-native';
import Constants from 'expo-constants';
import React from 'react'
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

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
  const { data } = useQuery(ME)
  const [signOut] = useSignOut()

  const onPress = async () => {
    try {
      await signOut()
    } catch (error) {
      console.log(error);
    }
  }

  return <View style={styles.container}>
      <ScrollView horizontal >
        <Link to={'/'}><Text style={styles.text}>Repositories</Text></Link>
        { data && data.me 
          ? <>
              <Link to={'/createReview'}><Text style={styles.text}>Create a Review</Text></Link>
              <Pressable onPress={onPress}><Text style={styles.text}>Sign Out</Text></Pressable>
            </>
          : <>
              <Link to={'/signIn'}><Text style={styles.text}>Sign In</Text></Link>
              <Link to={'/signUp'}><Text style={styles.text}>Sign Up</Text></Link>
            </>
        }
      </ScrollView>
    </View>;
};

export default AppBar;