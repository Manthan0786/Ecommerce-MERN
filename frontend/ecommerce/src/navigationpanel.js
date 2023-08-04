import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-black z-10 text-amber sticky top-0 left-0 right-24 flex justify-around items-center h-16">
      <ul className="flex space-x-4">
        <li>
          <Link to="/home" >Home</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;