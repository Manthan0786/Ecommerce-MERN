import './App.css';
import Product from './productList';
import Header from './header';
import AlertDialog from './dialogBox';

function App() {
  const token = sessionStorage.getItem('token');
    if (token) {
      return (
        <>
          <Header />
          <Product />
        </>
      )
    } else {
      return(
        <AlertDialog />
      )
    } 
}

export default App;
