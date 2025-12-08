import { Comment } from "@/app/types/api";

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="max-w-[1440px]">
        <h4 className="text-primary p-4 md:ml-42 text-2xl">No comments yet</h4>
      </div>
    );
  }
  return <h4 className="text-primary p-4 md:ml-42 text-2xl font-bold">{comments.length} Comments</h4>;
};

export default CommentList;
