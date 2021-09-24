import gql from 'graphql-tag';

const UseViewerQuery = gql`
  query GetViewer {
    viewer {
      id
      alias
      displayName
    }
  }
`;
