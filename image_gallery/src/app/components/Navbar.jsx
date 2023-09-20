import { useTheme } from 'next-themes';
import Themetoggler from './themetoggler';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromStorage = sessionStorage.getItem('username');
    setUser(userFromStorage);
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clearing sessionStorage and redirecting to login page
    sessionStorage.clear();
    window.location.href = '/accounts/login';
  };

  const navLinkStyle = `text-${theme === 'dark' ? 'white' : 'black'} m-2`;

  return (
    <nav className={`flex flex-wrap px-8 rounded-md sticky top-0 items-center justify-between shadow-xl ${theme === 'dark' ? 'bg-inherit' : 'bg-[#dfffe9]'}`}>
      <div className="logo">
        {/* Your Logo */}
      </div>
      <div className={`flex-grow text-center md:text-right mt-2 md:mt-0`}>
        <Link href="/"
          className={`${theme === 'dark' ? 'text-white' : 'text-black'} m-2`}>Home
        </Link>
        {/* <Link href=""
          className={navLinkStyle}>Gallery
        </Link> */}
      </div>
      <div className="flex items-center ml-4 mr-4">
        {user ? (
          <div className={`${navLinkStyle} cursor-pointer`} onClick={handleLogout}>
            Logout
          </div>
        ) : (
          <Link href="/accounts/login"
          className={`${theme === 'dark' ? 'text-white' : 'text-black'} m-2`}>Login
          </Link>
        )}
      </div>
        <Themetoggler />
    </nav>
  );
};

export default Navbar;
