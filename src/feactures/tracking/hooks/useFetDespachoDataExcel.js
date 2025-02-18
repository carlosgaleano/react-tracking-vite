import { useState, useEffect, useRef } from 'react'; // Import useRef
import { getDataForExcel } from '../helpers/getDataForExcel';

export const useFetDespachoDataExcel = (refresh) => {
    const [state, setState] = useState({
        data: [],
        loading: true,
        error: null
    });

    const isFetching = useRef(false); // Add a ref to track fetching

    useEffect(() => {
        console.log("useFetDespachoDataExcel ejecutado", refresh);
        let isActive = true;

        if (!isFetching.current && refresh != 0) { // Only fetch if not already fetching
            isFetching.current = true; // Set fetching to true

            setState(prevState => ({ ...prevState, loading: true, error: null }));

            getDataForExcel()
                .then((data) => {
                    if (isActive) {
                        setState({ data, loading: false, error: null });
                    }
                })
                .catch(error => {
                    if (isActive) {
                        console.error("Error fetching data:", error);
                        setState({ data: [], loading: false, error });
                    }
                })
                .finally(() => {
                    if (isActive) {
                        isFetching.current = false; // Reset fetching in finally block
                    }
                });
        }

        return () => {
            isActive = false;
            isFetching.current = false; // Reset on unmount, important!
        };
    }, [refresh]);

    return state;
};