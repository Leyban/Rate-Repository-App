import Text from './Text';
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../utils/themes';

const initialValues = {
  username: '',
  password: ''
}


const SignInForm = ({onSubmit}) => {
  return <View style={styles.container} >
    <FormikTextInput style={styles.input} name='username' placeholder='Username'/>
    <FormikTextInput style={styles.input} name='password' placeholder='Password' secureTextEntry={true}/>
    <Pressable style={styles.button} onPress={onSubmit}>
      <Text fontWeight='bold' fontSize='subheading' style={styles.buttonText} >Sign In</Text>
    </Pressable>
  </View>
}


const SignIn = () => {
  const onSubmit = (who) => {
    console.log(who)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>

  );
};

export default SignIn;

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white'
  },  
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 2,
  },
  buttonText: {
    color: 'white'
  }
})