import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from "axios";

const Contact = () => {
  const recaptchaRef = useRef()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [token, setToken] = useState("")

  const key ='6LdvRBMqAAAAADVY0-mK7-sv_RXI7Xm1zobxdThB'

  const onChangeRecapthca = (recaptchaToken) => {
    setToken(recaptchaToken)
  }

  const handleSubmit = async () => {
    try {
      if (token && name && email && message) {
        console.log('Send post request');
        await axios.post('/api/auth/contact', { name, email, message, token })
        setToken("")
        recaptchaRef.current.reset()
      } else {
        alert("Required fields")
      }

    } catch (error) {
      console.log('handlesubmit error: ', error);
    }

  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full '>
      <div>
        <label htmlFor="name" className='mt-4 ml-2 block font-bold mb-2'>İsim:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className='ml-2 dark:bg-gray-800 bg-gray-200 rounded-lg h-12 mt-2 w-full'
        />
      </div>
      <div>
        <label htmlFor="email" className='mt-4 ml-2 block font-bold '>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='ml-2 dark:bg-gray-800 bg-gray-200 rounded-lg h-12 mt-2 w-full'
        />
      </div>
      <div>
        <label htmlFor="message" className='mt-4 ml-2 block font-bold mb-2'>Mesaj:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className='ml-2 dark:bg-gray-800 bg-gray-200 rounded-lg h-48 mt-2 w-full '
        />
      </div>
      <div>
        <ReCAPTCHA
          sitekey={key}
          onChange={onChangeRecapthca}
          ref={recaptchaRef}
          className='ml-2 mt-2'
        />
      </div>
      <button className='cursor-pointer dark:bg-gray-700 mt-4 p-4 rounded-lg dark:hover:bg-gray-600 bg-gray-200 hover:bg-gray-300 font-bold' type="submit">Gönder</button>
    </form>
  );
};

export default Contact;
