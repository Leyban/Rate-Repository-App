import { FlatList } from "react-native";
import useMyReviews from "../hooks/useMyReviews";
import ReviewItem from "./ReviewItem";
import React from 'react'
import Text from "./Text";

const MyReviews = () => {
    const { myReviews, fetchMore, deleteReview } = useMyReviews()

    const onEndReach = () => {
        fetchMore()
    }

    return (<>
        {myReviews 
            ? <FlatList
                data={myReviews.edges}
                renderItem={({item})=><ReviewItem review={item.node} myReview={true} deleteReview={deleteReview}/>}
                keyExtractor={( item ) => item.node.id }
                onEndReached={onEndReach}
                onEndReachedThreshold={0.5}
            />
            : <Text>Loading...</Text>
    }</>);
}
 
export default MyReviews;