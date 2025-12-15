import { Comment } from "@/app/types/api";

interface CommentElProps {
  comments: Comment[];
}

const CommentEl = ({ comments }: CommentElProps) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto p-6">
        <h4 className="text-primary text-2xl mb-4 uppercase">No comments yet</h4>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] md:ml-42 mx-auto md:p-0 pl-4">
      {comments.map((comment) => (
        <div className="pt-6" key={comment.id}>
          <p className="text-lg mb-2 font-bold">
            {comment.name} -{" "}
            <span className="text-sm text-secondary mt-2">
              Posted on{" "}
              {new Date(comment.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </p>
          <p className="text-primary">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentEl;
