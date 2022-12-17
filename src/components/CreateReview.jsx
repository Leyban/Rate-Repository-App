import { Formik } from "formik";
import { Pressable, StyleSheet, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import * as yup from 'yup'
import useCreateForm from "../hooks/useCreateForm";
import { useNavigate } from "react-router-native";
import React from 'react'
import theme from "../utils/themes";

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
}

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Repository owner name is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .positive()
        .integer()
        .min(0)
        .max(100)
        .required('Rating is required'),
    text: yup
        .string()
})

const ReviewForm = ({onSubmit}) => {
    return <View style={styles.container}>
        <FormikTextInput style={ styles.input } name='ownerName' placeholder='Repository owner name' />
        <FormikTextInput style={ styles.input } name='repositoryName' placeholder='Repository name' />
        <FormikTextInput style={ styles.input } name='rating' placeholder='Rating between 0 and 100' />
        <FormikTextInput style={ styles.input } name='text' placeholder='Review' />
        <Pressable onPress={onSubmit} style={styles.button}>
            <Text fontWeight='bold' fontSize='subheading' style={styles.buttonText}>Create a review</Text>
        </Pressable>
    </View>
}

const ReviewFormContainer = ({onSubmit}) => {
    return <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
    >
        {({handleSubmit}) => <ReviewForm onSubmit={handleSubmit}/>}
    </Formik>
}

const CreateReview = () => {
    const [createForm] = useCreateForm()
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        const {ownerName, repositoryName, rating, text} = values
        const repoId = ownerName + '.' + repositoryName

        try {
            await createForm({ownerName, repositoryName, rating, text})
            navigate(`/single/${repoId}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (<ReviewFormContainer onSubmit={onSubmit} />);
}

export default CreateReview;


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