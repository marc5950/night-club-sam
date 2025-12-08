import { Comment } from "@/app/types/api";

interface CommentElProps {
  comments: Comment[];
}

const CommentEl = ({ comments }: CommentElProps) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto p-6">
        <h4 className="text-primary text-2xl mb-4">No comments yet</h4>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto p-6">
      {comments.map((comment) => (
        <div key={comment.id}>
          <p className="text-primary font-bold mb-2">
            {comment.name} - <span className="text-sm text-secondary font-light mt-2">Posted on{new Date(comment.date).toLocaleDateString()}</span>
          </p>
          <p className="text-primary">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentEl;
