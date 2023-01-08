import React from 'react'
import { FlatList } from 'react-native'
import { useParams } from 'react-router-native'
import useSingleRepository from '../hooks/useSingleRepository'
import RepositoryItem from "./RepositoryItem"
import ReviewItem from './ReviewItem'
import Text from './Text'

const RepositoryInfo = ({repository}) => {
    return (<RepositoryItem {...repository}/>);
}

const SingleRepository = () => {
    const { repoId } = useParams()
    const { repository:singleRepo, fetchMore } = useSingleRepository(repoId)

    const onEndReach = () => {
        fetchMore()
    }
    
    return (<>
        {singleRepo 
            ? <FlatList
                data={singleRepo.reviews.edges}
                renderItem={({ item }) => <ReviewItem review={item.node} />}
                keyExtractor={( item ) => item.node.id }
                ListHeaderComponent={() => <RepositoryInfo repository={singleRepo} />}
                onEndReached={onEndReach}
                onEndReachedThreshold={0.5}
            />
            : <Text>Loading...</Text>
        }
    </>)
}
 
export default SingleRepository;

