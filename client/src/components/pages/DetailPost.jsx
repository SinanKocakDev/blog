import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailPost } from "../../redux/postSlice";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

const DetailPost = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { post, loading } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(detailPost(slug));
  }, [dispatch, slug]);

  return (
    <div className="min-h-screen ">
      {loading ? (
        "Yükleniyor..."
      ) : post && Object.keys(post).length !== 0 ? (
        <div className="p-4">
          <h1 className="text-3xl font-bold pb-2 tracking-wide leading-8">{post.title}</h1>
          <div className="prose prose-lg mt-8 tracking-wide leading-8 text-lg"><ReactMarkdown>{post.body}</ReactMarkdown></div>
        </div>
      ) : (
        <div>Gösterilecek yazı bulunamadı.</div>
      )}
    </div>
  );
};

export default DetailPost;
