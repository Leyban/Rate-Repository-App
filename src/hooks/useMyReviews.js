import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { DELETE_REVIEW } from "../graphql/mutations"
import { ME } from "../graphql/queries"

const useMyReviews = () => {
    const response = useQuery(ME, {
        fetchPolicy: 'cache-and-network',
        variables: {
            includeReviews: true,
            first: 3,
            after: ''
        }
    })

    const [mutate] = useMutation(DELETE_REVIEW)

    const { data, error, loading, fetchMore, refetch } = response

    const [ myReviews, setMyReviews ] = useState()

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.me.reviews.pageInfo.endCursor,
            }
        })
    }

    const handleDeleteReview = async (id) => {
        await mutate({variables: {deleteReviewId: id}})
        refetch()
    }


    useEffect(()=>{
        if(!loading && data) {
            setMyReviews(data.me.reviews)
        }
    }, [loading, data])

    return { myReviews, fetchMore: handleFetchMore, deleteReview: handleDeleteReview}
}

export default useMyReviews