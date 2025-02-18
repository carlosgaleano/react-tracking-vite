import 'bootstrap/dist/css/bootstrap.min.css';
import imglog from '../../../img/logo_logytech2.png';


function NavbarTop() {

 

    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark h-50 nav2">
            {/* Brand */}
            <>
                <img 
                    src={imglog} 
                    alt="logo" 
                    style={{ width: '100px', height: '50px', backgroundColor: 'white' }} 
                
                />
            </>

            {/* Links */}
            <p className="navbar-nav center1 text-white-50 ml-5">
              
                        Tracking de Ordenes de Entrega
                    
              
                
            </p>
        </nav>
    );
}

export default NavbarTop;