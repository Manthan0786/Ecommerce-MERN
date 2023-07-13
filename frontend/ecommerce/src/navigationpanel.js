import { Link, Routes, Route } from 'react-router-dom';
// import Home from './Home';
// import Products from './Products';
import Cart from './cart';
import AddProduct from './addProduct';
import App from './App';

function NavBar() {
  return (
    <nav className="bg-black z-10 text-amber sticky top-0 left-0 right-0 flex justify-center items-center w-full h-16 mb-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/products" >Home</Link>
        </li>
        {/* <li>
          <Link to="/products" component={Products}>Products</Link>
        </li> */}
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;