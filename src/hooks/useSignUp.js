import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_IN, SIGN_UP } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import useSignIn from "./useSignIn";

const useSignUp = () => {
    const [signUpMutate, result] = useMutation(SIGN_UP)
    const [signIn] = useSignIn()

    const signUp = async ({ username, password }) => {
        await signUpMutate({variables: {user: {username, password}}})
        await signIn({username, password})
    }

    return [signUp, result];
}
 
export default useSignUp;