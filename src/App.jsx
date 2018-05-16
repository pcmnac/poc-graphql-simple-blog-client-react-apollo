import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Link, Redirect , Switch} from "react-router-dom";
import gql from 'graphql-tag';
import './App.css';

import PostList from './components/PostList';
import PostDetail from './components/PostDetails';

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
});

client
    .query({
        query: gql`
            {
                hello
            }
        `
    })
    .then(result => console.log("Testing client:", result));

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Router>
                    <div className="App">
                        <h1>Simple Blog!</h1>
                        <hr/>
                        <nav>
                            <Link to="/posts">Posts</Link>
                        </nav>
                        <Switch>
                            <Redirect exact from="/" to="/posts" />
                            <Route path="/posts" component={PostList} />
                            <Route path="/post/:id" component={PostDetail} />
                        </Switch>
                    </div>
                </Router>
            </ApolloProvider>
        );
    }
}

export default App;
