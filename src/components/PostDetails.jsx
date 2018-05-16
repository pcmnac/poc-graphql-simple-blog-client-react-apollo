import React from 'react';
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import Comment from './Comment';
import CommentForm from './CommentForm';

const POST_DETAILS = gql`
    query getPost($id: Int!) {
        post(id: $id) {
            id
            title
            body
            comments {
                id
                email
                body
            }
        }
    }
`;

function Post({
    title,
    id,
    body,
    comments = [],
    refetch,
}) {
    return(
        <div>
            <h2>{title}</h2>
            <p className="post-body">
                { body }
            </p>
            <Link to="/">Back</Link>
            <h4>Add Comment:</h4>
            <CommentForm postId={id} onAdded={refetch} />
            <h4>Comments:</h4>
            {
                comments.slice().reverse().map(comment => <Comment key={comment.id} {...comment} onRemoved={refetch} />)
            }

            <Link to="/">Back</Link>
        </div>
    );
}



function PostDetails({
    match: { params: { id  } }
}) {
    return (
        <Query query={POST_DETAILS} variables={{ id }}>
            {
                ({loading, error, data, refetch}) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    
                    return <Post {...data.post} refetch={refetch}/>;
                }
            }
        </Query>
    )
}

export default PostDetails;