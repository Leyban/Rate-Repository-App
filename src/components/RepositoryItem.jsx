import { View, StyleSheet, Image, Pressable } from 'react-native'
import * as Linking from 'expo-linking'
import Text from './Text'
import React from 'react'

import theme from '../utils/themes'
import { useParams } from 'react-router-native'

const styles = StyleSheet.create({
  container:{
    padding: 15,
    backgroundColor: 'white'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },  
  headerText: {
    paddingLeft: 20,
    display: 'flex',
    justifyContent: 'space-between',
    width: 0,
    flexGrow: 1,
    flex: 1,
  },
  avatar:{
    width: 50,
    height: 50,
    borderRadius: 5
  },
  languageContainer: {
    paddingLeft: 70,
    marginTop: 10
  },
  language: {
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    padding: 5,
    color: 'white',
    alignSelf: 'flex-start',
  },
  scoreBoard: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  scoreCard: {
    display: 'flex',
    alignItems: 'center'
  },
  githubLink: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    color: 'white',
    padding: 20,
    textAlign: 'center',
    marginTop: 20
  }
})

const ScoreCard = ({title, score}) => {
  let shownScore = String(score);
  if (score > 1000){
    shownScore = String(Math.floor(score * 0.01) / 10).concat('k')
  } else if (score > 1000000){
    shownScore = String(Math.floor(score * 0.00001) / 10).concat('m')
  }
  return <View style={styles.scoreCard}>
    <Text fontWeight='bold'>{shownScore}</Text>
    <Text>{title}</Text>
  </View>
}


export default function RepositoryItem({
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  ownerAvatarUrl,
  url
}) {
  const { repoId } = useParams()
  
  const onPress = () => {
    Linking.openURL(url)
  }

  return (
    <View testID='repositoryItem' style={styles.container}>
      <View style={styles.header}>
        <Image 
          style={styles.avatar}
          source={{
            uri: ownerAvatarUrl
          }}
        />
        <View style={styles.headerText} >
          <Text fontWeight='bold' fontSize='subheading'>{fullName}</Text>
          <Text >{description}</Text>
        </View>
      </View>

      <View style={styles.languageContainer}>
        <Text style={styles.language}>{language}</Text>
      </View>

      <View style={styles.scoreBoard}>
        <ScoreCard title={'Stars'} score={stargazersCount}/>
        <ScoreCard title={'Forks'} score={forksCount}/>
        <ScoreCard title={'Reviews'} score={reviewCount}/>
        <ScoreCard title={'Rating'} score={ratingAverage}/>
      </View>
        
      {repoId && <View onPress={onPress}>
        <Pressable onPress={onPress}>
          <Text fontWeight='bold' fontSize='subheading' style={styles.githubLink}>Open In Github</Text>
        </Pressable>
      </View>}
    </View>
  )
}