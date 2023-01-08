import React from 'react'
import { Alert, Pressable, StyleSheet, View } from 'react-native'
import { Link } from 'react-router-native';
import theme from '../utils/themes'
import Text from './Text'

const ReviewItem = ({ review, myReview = false, deleteReview }) => {
    const createdAt = new Date(review.createdAt)
    const year = String(createdAt.getFullYear())
    const month = String(createdAt.getMonth() + 1)
    const day = String(createdAt.getDate())

    const createTwoButtonAlert = () =>
        Alert.alert(
            "Delete review",
            "Are you sure you want to delete this review?",
            [
                {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "OK", onPress: () => {
                    try {
                        deleteReview(review.id)
                    } catch (error) {
                        console.log(error)
                    }
                }}
            ]
    );

    return <View key={review.id} style={styles.superContainer}>
        <View style={styles.reviewContainer}>
            <Text fontWeight='bold' fontSize='subheading' style={styles.rating}>
                {review.rating}
            </Text>
            <View style={[styles.textsContainer, myReview && {marginBottom: 0}]}>
                {myReview 
                    ? <Text fontWeight='bold' fontSize='subheading'>{review.repository.fullName}</Text>
                    : <Text fontWeight='bold' fontSize='subheading'>{review.user.username}</Text>
                }
                <Text style={styles.createdAt}>{[day, month, year].join('.')}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
        
        {myReview && <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, styles.viewButton]}>
                <Link to={`/single/${review.repository.id}`} >
                    <Text fontWeight='bold' fontSize='subheading' style={{color: 'white'}}>View Repository</Text>
                </Link>
            </Pressable>
            <Pressable style={styles.button} onPress={()=>createTwoButtonAlert()}>
                <Text fontWeight='bold' fontSize='subheading' style={{color: 'white'}}>Delete Review</Text>
            </Pressable>
        </View>}
    </View>
};

export default ReviewItem

const styles = StyleSheet.create({
    superContainer: {
        marginTop: 10,
        backgroundColor: 'white'
    },
    reviewContainer:{
        display: 'flex',
        flexDirection: 'row',

    },
    rating: {
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 15,
        height: 40,
        width: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        color: theme.colors.primary,
    },
    createdAt: {
        color: theme.colors.textSecondary
    },
    textsContainer: {
        flex: 1,
        margin: 15,
        marginLeft: 0
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: theme.colors.error,
        borderRadius: 5,
        padding: 20,
        margin: 20,
        flex: 1,
        display: 'flex',
        alignItems: 'center'
    },
    viewButton: {
        marginRight: 0,
        backgroundColor: theme.colors.primary
    }
})