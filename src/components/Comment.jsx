import React from 'react';import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const REMOVE_COMMENT = gql`
    mutation remove($id: Int!) {
        removeComment(id: $id)
    }
`;

function Comment({
    id,
    email,
    body,
    onRemoved,
}) {
    return (
        <Mutation
            mutation={REMOVE_COMMENT}
            onCompleted={onRemoved}
        >
            {
                (removeComment) => 
                    <div>
                        <strong style={{ color: '#369' }}>{ email }</strong> wrote:
                        <span className="removeButton" onClick={() => removeComment({ variables: { id } })}>x</span>
                        <p>{ body }</p>
                        <hr/>
                    </div>
            }
            
        </Mutation>
    )
}


export default Comment;