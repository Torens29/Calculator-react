import { useCallback } from 'react';

export const Input = ({ onChange, ...props }) => {
    return (
        <input
            {...props}
            type="text"
            onChange={useCallback(
                (event) => {
                    onChange(event.target.value);
                },
                [onChange]
            )}
        />
    );
};
