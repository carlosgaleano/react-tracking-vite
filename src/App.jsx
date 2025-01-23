import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'; // Importa desde pages/
import LoginPage from './pages/LoginPage/LoginPage'; // Importa desde pages/
import Footer from './feactures/menu/components/Footbar';
import NavbarTop from './feactures/menu/components/NavBarTop';
/*import Menu from './routes/Menu';
import {ProtecteRoute} from './feactures/auth/helpers/ProtectedRoute';
import {useAuthStore} from './feactures/auth/store/auth';
*/

function App() {
  //const isAuth=useAuthStore(state=>state.isAuth);
    return (
      <>

       <NavbarTop />
      <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
            
           
        </Router>
        

        <Footer />
      </>
        
    );
}

export default App;
