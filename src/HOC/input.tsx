import { useState, ChangeEvent } from 'react';

const input = (Component: any) => (props: any) => {
    
    const [value, setValue] = useState('');

    //* Standart handler for an input changes
    const handleChange = (event: ChangeEvent) => {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        const text: string = input.value;

        setValue(text);
    }
    
    return (
        <Component 
            {...props} 
            value={value} 
            handleChange={handleChange}
        />
    );
};

export default input;