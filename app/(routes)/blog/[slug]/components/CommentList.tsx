import { Comment } from "@/app/types/api";

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="max-w-[1440px]">
        <h4 className="text-primary md:p-0 pl-4 font-bold mt-10 md:ml-42 text-2xl uppercase">No comments yet</h4>
      </div>
    );
  }
  return <h4 className="text-primary mt-12 md:p-0 pl-4 md:ml-42 text-2xl font-bold uppercase">{comments.length} Comments</h4>;
};

export default CommentList;
