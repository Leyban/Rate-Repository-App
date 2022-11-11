import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import React from 'react'

const styles = StyleSheet.create({});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];
  
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;