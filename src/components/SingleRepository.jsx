import React from 'react'
import { useParams } from 'react-router-native'
import useRepositories from '../hooks/useRepositories'
import RepositoryItem from "./RepositoryItem"

const SingleRepository = () => {
    const { repositories } = useRepositories()
    const { repoId } = useParams()
    let repoItem
  
    if(repoId){
      const repositoryNodes = repositories 
      ? repositories.edges.map(edge => edge.node)
      : []
  
      repoItem = repositoryNodes.find( item => item.id === repoId )
    }

    return (<RepositoryItem {...repoItem}/>);
}
 
export default SingleRepository;