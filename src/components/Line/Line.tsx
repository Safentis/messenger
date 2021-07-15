import { FC          } from 'react';
import { Props       } from './Line.interface';
import { useSelector } from 'react-redux';
import './Line.css';

const Line: FC <Props> = ({className}) => {
    
    const dialogs = useSelector((state: any): any[] => {
        return state.dialogsReducer.dialogs;
    });

    let index: number = 0;
    let count: number = 0;
    let array: any[] = Object.values(dialogs);

    while (index < array.length) {

        if (array[index].status === 'noactive') {
            count++;
        }

        index += 1;
    }

    return (
        <div className={`line ${className}`}>
            <p className="line__content">
                Customer in line: 
                <span className="line__count">
                    {count}
                </span> 
            </p>
        </div>
    );
};

export default Line;