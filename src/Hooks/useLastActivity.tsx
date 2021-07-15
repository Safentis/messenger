import { useState, useEffect }  from 'react';
import moment from 'moment';

const useLastActivity = (timestamp: number | string): number | string => {

    const [lastActivity, setLastActivity] = useState('');

    useEffect(() => {
        const dateMoment  : any = moment(timestamp);
        const lastActivity: any = dateMoment.fromNow();

        setLastActivity(lastActivity);

        return () => {
            setLastActivity('');
        }
    }, [timestamp])


    return lastActivity;
};

export default useLastActivity;