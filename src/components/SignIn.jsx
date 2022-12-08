import Text from './Text';
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../utils/themes';
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn';
import AuthStorage from '../utils/authStorage';


const initialValues = {
  username: '',
  password: ''
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
})

const SignInForm = ({onSubmit}) => {

  return <View style={styles.container} >
    <FormikTextInput name='username' placeholder='Username' />
    <View style={styles.separator} />
    <FormikTextInput name='password' placeholder='Password' secureTextEntry={true}/>
    <View style={styles.separator} />
    <Pressable style={styles.button} onPress={onSubmit}>
      <Text fontWeight='bold' fontSize='subheading' style={styles.buttonText} >Sign In</Text>
    </Pressable>
  </View>
}


const SignIn = () => {
  const [signIn] = useSignIn()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      const result = await signIn({username, password})
      const authStorage = new AuthStorage('authStorage')
      await authStorage.setAccessToken(result.data.authenticate.accessToken)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit} 
      validationSchema={validationSchema}
    >
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

  errorInput: {
    borderColor: theme.colors.error
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
  },
  separator: {
    height: 20
  }
})