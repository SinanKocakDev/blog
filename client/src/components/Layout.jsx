import { Link, Outlet } from "react-router-dom";
import { CiDark } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { MdLightMode } from "react-icons/md";
import { HiTerminal } from "react-icons/hi";
import { useState, useEffect } from "react";

const Layouts = () => {

  const [ theme, setTheme ] = useState(
    localStorage.getItem("theme")==="light" ? "dark" : "light"
  )

  useEffect(()=>{
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.theme = 'light'
    localStorage.theme = 'dark'
    localStorage.removeItem('theme')
  },[])

  const changeTheme = () => {
    setTheme(theme==="light" ? "dark" : "light")
    if(theme === "dark")
    {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme","dark")
    }else{
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme","light")
    }
  }

  const menuItems = [
    {
      name: "Yazılar",
      url: "/posts",
    },
    {
      name: "Hakkımda",
      url: "/about",
    },
    {
      name: "İletişim",
      url: "/contact",
    },
  ];

  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <div className=" dark:text-gray-100 dark:bg-gray-900 min-h-screen">
      <header className="bg-gray-200 mb-4 dark:bg-gray-800">
        <div className="container flex items-center justify-between mx-auto p-4 max-w-2xl">
          <Link to="/">
            <div className="flex gap-2 logo p-2 hover:bg-gray-400 rounded-lg cursor-pointer text-xl font-semibold dark:hover:bg-gray-600">
            <HiTerminal size={35} md:size={24} className="dark:text-green-400 text-green-600"/>
            <span className="text-md items-center flex">./SinanKoçak</span>

            </div>
          </Link>

          <div
            className={`menu hidden md:flex gap-2 ${isOpen ? "" : "hidden"}`}
          >
            {menuItems.map((item, i) => (
              <Link
                key={i}
                to={item.url}
                className="hover:bg-gray-400 rounded-lg p-2 text-sm cursor-pointer dark:hover:bg-gray-600"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <div className="p-1 hover:bg-gray-400 rounded-lg cursor-pointer dark:hover:bg-gray-600" onClick={changeTheme}>
              {theme === "dark" ? <CiDark size={24} /> :<MdLightMode size={24} />}
            </div>
          </div>


            <button
              id="menu-btn"
              className="block md:hidden focus:outline-none"
              onClick={toggleMenu}
            >
              <FaBars size={24} />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-[170px] bg-white shadow-lg rounded-lg p-2 w-48 dark:bg-gray-700">
                {menuItems.map((item, i) => (
                  <Link
                    key={i}
                    to={item.url}
                    className="block px-4 py-2 hover:bg-gray-600 rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

        </div>
      </header>

      <main className="container max-w-2xl mx-auto p-4 ">
        <Outlet />
      </main>

      <footer className="container max-w-2xl mx-auto p-4">
        <div className="text-center text-base">Copyright © 2024 - Tüm hakları saklıdır</div>
      </footer>
    </div>
  );
};

export default Layouts;
