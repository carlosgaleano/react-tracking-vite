import { useState, useEffect } from "react";
import { getDataForExcel } from '../helpers/getDataForExcel';

export const useFetDespachoDataExcel = (refresh) => {
    const [state, setState] = useState({
        data: [],
        loading: true,
        error: null  // Important: Add an error state!
    });

    useEffect(() => {
        let isActive = true;

        setState(prevState => ({ ...prevState, loading: true, error: null })); // Set loading, clear errors

        getDataForExcel() // No arguments needed here
            .then((data) => {
                if (isActive) {
                    setState({
                        data: data,
                        loading: false,
                        error: null
                    });
                }
            })
            .catch(error => {
                if (isActive) {
                    console.error("Error fetching data:", error);
                    setState({
                        data: [],
                        loading: false,
                        error: error // Set the error state
                    });
                }
            });

        return () => {
            isActive = false;
        };
    }, [refresh]);  // Only refresh in the dependency array

    return state;
};