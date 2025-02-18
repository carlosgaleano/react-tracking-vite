import { useState } from 'react';
import { Button } from 'react-bootstrap';

const SearchForm = ({ onSubmit }) => {
    const [trackingNumber, setTrackingNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(trackingNumber); // Llama a la función onSubmit que se pasa como prop
        setTrackingNumber(''); // Limpia el input después de la búsqueda
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Ingrese su número de seguimiento"
                className="form-control mb-3"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <Button variant="primary" type="submit">Buscar</Button>
        </form>
    );
};

export default SearchForm;