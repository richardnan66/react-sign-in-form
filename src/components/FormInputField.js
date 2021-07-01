// contains title label, custom input & error label
import TextField from './TextField';
import clsx from 'clsx';

function FormInputField({ className, label, name, type, value, error, autofocus, onChange }) {
    return (
        <div className={clsx('form-input-field' , { [className]: true })}>
            <label className="form-label">{label}</label>
            <TextField
                name={name}
                type={type}
                value={value}
                error={error}
                autofocus={autofocus}
                onChange={onChange} // forward to onChange function passed from props
            ></TextField>
            {error && <label className="error-label">{error}</label>}
        </div>
    );
}

export default FormInputField;