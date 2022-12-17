import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useParams } from 'react-router-native'
import useSingleRepository from '../hooks/useSingleRepository'
import theme from '../utils/themes'
import RepositoryItem from "./RepositoryItem"
import Text from './Text'

const RepositoryInfo = ({repository}) => {
    return (<RepositoryItem {...repository}/>);
}

const ReviewItem = ({ review }) => {
    const createdAt = new Date(review.createdAt)
    const year = String(createdAt.getFullYear())
    const month = String(createdAt.getMonth() + 1)
    const day = String(createdAt.getDate())

    return <View key={review.id} style={styles.reviewContainer}>
        <Text fontWeight='bold' fontSize='subheading' style={styles.rating}>
            {review.rating}
        </Text>
        <View style={styles.textsContainer}>
            <Text fontWeight='bold' fontSize='subheading'>{review.user.username}</Text>
            <Text style={styles.createdAt}>{[day, month, year].join('.')}</Text>
            <Text>{review.text}</Text>
        </View>
    </View>
};

const SingleRepository = () => {
    const { repoId } = useParams()
    const { repository:singleRepo } = useSingleRepository(repoId)
    
    return (<>
        {singleRepo 
            ? <FlatList
                data={singleRepo.reviews.edges}
                renderItem={({ item }) => <ReviewItem review={item.node} />}
                keyExtractor={( item ) => item.node.id }
                ListHeaderComponent={() => <RepositoryInfo repository={singleRepo} />}
            />
            : <Text>Loading...</Text>
        }
    </>)
}
 
export default SingleRepository;

const styles = StyleSheet.create({
    reviewContainer:{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'white'
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
    }
})