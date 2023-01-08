import { gql } from '@apollo/client'

export const ME = gql`
  query ($includeReviews: Boolean = false, $first: Int, $after: String) {
    me {
      id
      username
      reviews (first: $first, after: $after) @include (if: $includeReviews)  {
        edges {
          cursor
          node {
            createdAt
            id
            rating
            repository {
              fullName
              id
            }
            text
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          startCursor
        }
      }
    }
  }
`

export const GET_REPOSITORIES = gql`
  query Repositories($first: Int, $after: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(first: $first, after: $after, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`

export const SINGLE_REPOSITORY = gql`
query ($repositoryId: ID!, $first: Int, $after: String) {
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
    reviews(first: $first, after: $after) {
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}
`