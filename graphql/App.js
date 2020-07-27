import React from 'react';
import {Text, View} from 'react-native';
import ApolloClient, {gql} from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex',
});

const App = () => {
  client
    .query({
      query: gql`
        {
          allUsers {
            id
            name
            email
            password
            comments {
              id
              post {
                id
              }
              text
              updatedAt
              user {
                id
              }
            }
          }
        }
      `,
    })
    .then(result => console.log(result));

  return (
    <View>
      <Text>so this is homescreen</Text>
      <Text>and here we will implement the graphql</Text>
    </View>
  );
};

export default App;
