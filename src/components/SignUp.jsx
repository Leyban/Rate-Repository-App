import { Pressable, StyleSheet, View } from "react-native";
import * as yup from 'yup'
import React from 'react'
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import useSignUp from "../hooks/useSignUp";
import { useNavigate } from "react-router-native";
import theme from "../utils/themes";


const initialValues = {
    username: '',
    password: '',
    passwordConfirm: ''
}

const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(2, 'Username has to be at least 2 characters')
      .max(29, 'Username should be no longer than 30 characters')
      .required('Username is required'),
    password: yup
      .string()
      .min(6, 'Password has to be at least 6 characters')
      .max(49, 'Password should be no longer than 50 characters')
      .required('Password is required'),
    passwordConfirm: yup
    .string()
      .oneOf([yup.ref('password'), null], 'Password does not match')
      .required('Password confirmation is required')
  })

const SignUpForm = ({onSubmit}) => {
    return <View style={styles.container} >
    <FormikTextInput style={ styles.input } name='username' placeholder='Username' />
    <FormikTextInput style={ styles.input } name='password' placeholder='Password' secureTextEntry={true}/>
    <FormikTextInput style={ styles.input } name='passwordConfirm' placeholder='Password confirmation' secureTextEntry={true}/>
    <Pressable style={styles.button} onPress={onSubmit}>
      <Text fontWeight='bold' fontSize='subheading' style={styles.buttonText} >Sign In</Text>
    </Pressable>
  </View>
}

const SignUpContainer = ({onSubmit}) => {
    return <Formik
      initialValues={initialValues} 
      onSubmit={onSubmit} 
      validationSchema={validationSchema}
    >
      {({handleSubmit}) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
}

const SignUp = () => {
  const [signUp] = useSignUp()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const {username, password} = values

    try {
      await signUp({username, password})
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (<SignUpContainer onSubmit={onSubmit} />);
}
 
export default SignUp;


// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
    backgroundColor: 'white'
  },  
  input: {
    marginTop: 20,
  },
  button: {
    backgroundColor: theme.colors.primary,
    marginTop: 20,
    padding: 15,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white'
  },
})