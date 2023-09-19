import { useTheme } from 'next-themes';
import Themetoggler from './themetoggler';

const Navbar = () => {
  const { theme, setTheme } = useTheme('dark');


  return (
    <nav className={`flex bg-${theme === 'dark' ? 'black' : 'white'} text-${theme === 'dark' ? 'white' : 'black'} justify-between p-4`}>
      <div className="logo">
        {/* Your Logo */}
      </div>
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/gallery">Gallery</Link>
      </div>
      <div className="auth-button">
        {user ? (
          <a href="/accounts/login">Logout</a>
        ) : (
          <a href="/accounts/signup">Login</a>
        )}
      </div>
     <Themetoggler />
    </nav>
  );
};

export default Navbar;
