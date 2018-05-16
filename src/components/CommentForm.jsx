import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_COMMENT = gql`
    mutation add($postId: Int!, $comment: CommentInput!) {
        addComment(postId: $postId, comment: $comment) {
            id
        }
    }
`;

const handleSubmit = ({ addComment, postId }) => event => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const variables = {
        comment: {
            name: data.get('name'),
            email: data.get('email'),
            body: data.get('body'),
        },
        postId,
    };
    console.log(variables);
    addComment({
        variables,
    }).then(() => {
        form.reset();
    }).catch(err => {
        alert('Error adding comment!');
        console.log(err);
    });
}

function Form({
    addComment,
    postId,
}) {
    return (
        <form onSubmit={handleSubmit({ addComment, postId })}>
            <label htmlFor="name">Name</label><br/>
            <input id="name" name="name" type="text" />
            <br/>
            <label htmlFor="email">Email</label><br/>
            <input id="email" name="email" type="email" />
            <br/>
            <label htmlFor="body">Comment</label><br/>
            <textarea rows="5" cols="100" id="body" name="body"/>
            <br/><br/>
            <button>Send!</button>
        </form>
    );
}

function CommentForm({
    postId,
    onAdded,
}) {
    return (
        <Mutation
            mutation={ADD_COMMENT}
            onCompleted={onAdded}
        >
            {
                (addComment, { data }) => {
                    return <Form postId={postId} addComment={addComment} />
                }   
            }
        </Mutation>
    )

}

export default CommentForm;