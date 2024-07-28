import TimeAgo from "./TimeAgo";
import { useNavigate } from "react-router-dom"


const PostCard = ({ post }) => {

    const navigate = useNavigate()

    const readingTime = Math.round(post.body.split(' ').length / 300);

  return (
    <div className="flex items-center bg-gray-200 p-4 rounded-lg mb-4 dark:bg-gray-800">
      <div className="flex-col w-full">
        <h1 className="text-xl font-bold pb-2">
          <div className="line-clamp-1 cursor-pointer" onClick={()=> navigate(`/posts/${post?.slug}`)}>{post.title}</div>
        </h1>
        <div className="flex items-center justify-between gap-2 w-full">
          <span className="text-sm"><TimeAgo createdAt={post.createdAt} /></span>
          <span className="text-sm">{readingTime} dakika okuma süresi</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
