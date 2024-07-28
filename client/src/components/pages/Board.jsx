import { FaEdit } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getAllPosts, deletePost } from "../../redux/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ConfirmModal from "../ConfirmModal";

const Board = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const [showModal, setShowModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const handleDelete = (id) => {
    setSelectedPostId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    dispatch(deletePost(selectedPostId))
      .then(() => {
        dispatch(getAllPosts());
      })
      .catch(err => {
        console.log("delete post error!",err);
      })
      .finally(() => {
        setShowModal(false);
        setSelectedPostId(null);
      });
  };

  const closeModal = () => {
    setShowModal(false)
    setSelectedPostId(null)
  }

  return (
    <div className="">
      <div className="flex justify-end">
        <Link to="/dashboard/create">
          <button className="text-white p-2 bg-green-600 mb-4 rounded-lg hover:bg-green-500">
            Create Post
          </button>
        </Link>
      </div>

      {loading && <div>Loading ...</div>}

      <div className="">
        {posts?.posts?.map((post, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-gray-200 p-4 rounded-lg mt-4"
          >
            <div className="flex items-center justify-between gap-2 w-full">
              <h1 className="text-lg line-clamp-1">{post.title}</h1>
              <div className="flex gap-2">
                <Link to={`/dashboard/edit/${post.slug}`}>
                  <span>
                    <FaEdit
                      className="text-yellow-500 hover:text-yellow-700 cursor-pointer"
                      size={20}
                    />
                  </span>
                </Link>

                <span onClick={() => handleDelete(post._id)}>
                  <IoTrash
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    size={20}
                  />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ConfirmModal
        show={showModal}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Board;
