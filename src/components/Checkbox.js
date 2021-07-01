import { useState, useCallback } from 'react';
import clsx from 'clsx';

function Checkbox({ className, label, checked, onChange }) {
    const [status, setStatus] = useState(checked);

    const handleChangeStatus = useCallback((e) => {
        setStatus(e.target.checked);
        onChange && onChange(e.target.checked);
    }, [setStatus, onChange]);

    // change checked status when click label
    const handleLabelClick = useCallback(() => {
        setStatus(!status);
        onChange && onChange(!status);
    }, [status, setStatus, onChange]);

    return (
        <div className={clsx('standard-checkbox-wrapper', { [className]: true })}>
            <input
                className="standard-checkbox"
                type="checkbox"
                checked={status}
                onChange={handleChangeStatus}
            />
            <label className="checkbox-label" onClick={handleLabelClick}>{label}</label>
        </div>
    );
}

export default Checkbox;