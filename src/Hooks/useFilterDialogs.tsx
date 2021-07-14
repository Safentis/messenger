import { useState, useEffect } from 'react';

interface Props {
    dialogs: any[]
    status : string;
}

const useFilterDialogs = ({dialogs, status}: Props) => {
    
    //* State of the custom-hook
    const [result, setResult] = useState([]);

    useEffect(() => {
        //* We are getting all dialogs and filter them
        //* to a status, and return result back 
        const filtered: any = dialogs.filter(([key, value]: any) => {
            return (
                value.status === status || 
                value.saved  === status || 
                value.saved  === status && value.status === 'complited' 
            );
        });

        setResult(filtered);

        return () => {
            setResult([]);
        }
    }, [dialogs])
    
    return result;
};

export default useFilterDialogs;