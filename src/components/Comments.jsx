import React from 'react';
import Comment from './Comment';
import AddComment from './AddComment';

const Comments = ({ comments, onCreate }) => {
  return (
    <section className="Comments">
      <AddComment onCreate={onCreate} />
      {comments.map(comment => {
        return <Comment {...comment} key={comment.id} />;
      })}
    </section>
  );
};

export default Comments;
