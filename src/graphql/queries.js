import { gql } from '@apollo/client'

export const ME = gql`
  {
    me {
      id
      username
    }
  }
`

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          id
          ownerName
          name
          createdAt
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          watchersCount
          forksCount
          openIssuesCount
          url
          ownerAvatarUrl
          description
          language
          userHasReviewed
        }
      }
    }
  }
`

export const SINGLE_REPOSITORY = gql`
query ($repositoryId: ID!) {
  repository(id: $repositoryId) {
    id
    fullName
    description
    ownerAvatarUrl
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    url
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`