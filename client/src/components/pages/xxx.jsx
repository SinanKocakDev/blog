import { useState } from "react";
import { createPost } from "../../redux/postSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title: title,
      body: body,
    };

    console.log(title,"title:::")
    console.log(body, "body:::::")

    dispatch(createPost(newPost))
      .then(() => {
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Post Create</h1>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Post Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="body" className="block text-gray-700 font-bold mb-2">
            Post Body
          </label>

          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            rows={8}
            required
          />

        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
