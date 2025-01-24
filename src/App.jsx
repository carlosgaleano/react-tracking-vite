import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import Footer from './feactures/menu/components/Footbar';
import NavbarTop from './feactures/menu/components/NavBarTop';
import Menu from './routes/Menu';
import {useAuthStore} from './feactures/auth/store/auth';

const ProtectedLayout = ({ isAllowed }) => {
    if (!isAllowed) {
        return <Navigate to="/login" />; // Redirect if not authenticated
    }
    return <Outlet />; // Render child routes if authenticated
};

const App=()=> {
    const isAuth = useAuthStore(state => state.isAuth);

    return (
        <>
            <NavbarTop />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />

                    <Route element={<ProtectedLayout isAllowed={isAuth} />}> {/* Corrected protected route setup */}
                        <Route path="/blog" element={<Menu />} />
                    </Route>
                </Routes>
            </Router>
            <Footer />
        </>
    );
}

export default App;
