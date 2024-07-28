import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getHomePosts } from '../../redux/postSlice';
import PostCard from '../PostCard';
import Hero from '../Hero'
import { Helmet } from 'react-helmet'

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getHomePosts());
  }, [dispatch]);

  return (
    <div className="">

      <Helmet>
        <title>Sinankocak.me | Anasayfa</title>
        <meta name="description" content="sinankocak.me kişisel blog sayfası" />
      </Helmet>

      <Hero />

      <div className="flex justify-between items-center">
        <h2 className="mb-2 p-2 text-xl">Son Yazılar</h2>
        <Link to="/posts">
          <button className="mb-2 p-2 hover:bg-gray-400 bg-gray-200 dark:hover:bg-gray-600 dark:bg-gray-800 rounded-lg">
            Tümünü Gör
          </button>
        </Link>
      </div>

      {
      loading ? "Looading..." : posts?.posts && <div className="">
        {
          posts?.posts?.map((post, i)=>(
            <PostCard post={post} key={i}/>
          ))
        }
      </div>
    }
    </div>
  );
};

export default Home;
