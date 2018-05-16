import React from 'react';
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import gql from 'graphql-tag';

import './PostList.css';


const POST_LIST = gql`
    query getPosts {
        posts {
            id
            title
        }
    }
`;

function PostListItem({
    title,
    id
}) {
    return(
        <li>
            <Link to={`/post/${id}`}><span className="badge">{id}</span> {title}</Link>
        </li>
    );
}


function PostList({
}) {
    return (
        <Query query={POST_LIST}>
            {
                ({loading, error, data}) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    
                    return (
                        <div>
                            <h2>Posts</h2>

                            <ul className="posts">
                                { data.posts.map(post => <PostListItem key={post.id} {...post}/>) }
                            </ul>;
                        </div>
                    ) 
                }
            }
        </Query>
    )
}

export default PostList;