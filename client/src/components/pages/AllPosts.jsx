import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../../redux/postSlice';
import ReactPaginate from 'react-paginate';

const AllPosts = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 3;
  const currentItems = posts?.posts?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(posts?.posts?.length / 3);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 3) % posts?.posts?.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  };

  const capitalizeTitle = (title) => {
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  return (
    <div className="min-h-screen p-4">
      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        <div className="">
          {currentItems?.map((post, i) => (
            <div key={i} className="p-4 mt-2 rounded-lg dark:bg-gray-800 bg-gray-200">
              <Link to={`/posts/${post._id}`} className="dark:text-white hover:underline">
                <h2 className="text-base font-bold">
                  {truncateTitle(capitalizeTitle(post.title), 60)}
                </h2>
              </Link>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel="ileri >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< geri"
          renderOnZeroPageCount={null}
          className='flex gap-2 items-center'
          pageClassName="px-2 py-1 rounded-md hover:bg-gray-400 focus:bg-gray-600 focus:outline-none"
          activeClassName="bg-gray-600 text-white"
        />
      </div>
    </div>
  );
};

export default AllPosts;
