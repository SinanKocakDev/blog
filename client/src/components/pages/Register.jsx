import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/userSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state)=>state.users)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
        let userCredentials = {
        username, password
      }

    dispatch(register(userCredentials)).then((result) => {
      if(result.payload)
      setUsername('')
      setPassword('')
      navigate("/");
    });
  };
  return (
    <div>
      <h1 className="text-center text-3xl text-bold">Register Page</h1>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-bold mb-2 dark:text-gray-200"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-green-500 dark:focus:border-green-500 dark:bg-gray-800 dark:focus:bg-gray-700"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2 dark:text-gray-200"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-green-500 dark:focus:border-green-500 dark:bg-gray-800 dark:focus:bg-gray-700"
            required
          />

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              {loading? 'Loading ...' : 'Register'}
            </button>
          </div>
              {error && (
        <div className="bg-red-400 text-white p-2 mt-2">{error}</div>
      )}
        </div>
      </form>
    </div>
  );
};

export default Register;
