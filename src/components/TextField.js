import { useState, useEffect, useCallback, useRef } from 'react';
import clsx from 'clsx';

function TextField({ name, type, value, placeholder, error, autofocus, onChange }) {
    const [text, setText] = useState(value);
    const inputRef = useRef();

    // focus on input when error is appeared
    useEffect(() => {
		if (error) {
            inputRef.current.focus();
        }
    }, [error, text]);

    const handleChange = useCallback((e) => {
        setText(e.target.value);
        onChange && onChange(e.target.value);
    }, [setText, onChange]);

    return (
        <input className={clsx('standard-text-field', { 'danger': error })}
            ref={inputRef}
            type={type}
            name={name}
            value={text}
            placeholder={placeholder}
            autoFocus={autofocus}
            onChange={handleChange}
        />
    );
}

export default TextField;