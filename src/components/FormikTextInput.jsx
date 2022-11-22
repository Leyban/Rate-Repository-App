import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import React from 'react'
import TextInput from './TextInput';
import Text from './Text';
import theme from '../utils/themes';

const styles = StyleSheet.create({
  errorText: {
    color: theme.colors.error,
    marginTop: 5
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  inputError: {
    borderColor: theme.colors.error
  }
});

const FormikTextInput = ({ name, style, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const inputStyle = [
    styles.input,
    showError && styles.inputError,
    style 
  ]

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={inputStyle}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;