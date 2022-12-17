import { useMutation } from "@apollo/client"
import { number } from "yup"
import { CREATE_REVIEW } from "../graphql/mutations"

const useCreateForm = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW)

    const createReview = async ({
            ownerName,
            repositoryName,
            rating,
            text
        }) => {
            const response = await mutate({variables: {review: {ownerName, repositoryName, rating: Number(rating), text}}})

            return response
        }

    return [createReview, result]
}

export default useCreateForm