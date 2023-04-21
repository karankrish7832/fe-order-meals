export const InputField = (props) => {
    const {
        type = 'string', 
        name, 
        value, 
        onChange, 
        placeholder = 'Enter',
        inputFieldClassName = '', 
        label,
        labelClassName = '',
        inputWrapperClass = '',
        ...rest
    } = props;


    return (
        <div className={`${inputWrapperClass} d-flex flex-column`}>
            {
                label ?
                    <label htmlFor={name} className={`${labelClassName} pb-1`}>{label}</label>
                :
                    ""
            }
            <input
                {...rest}
                type={type}
                name={name}
                value={value}
                onChange={({ target }) => onChange(name, target.value)}
                placeholder={placeholder}
                className={`${inputFieldClassName} custom-input`}
            />
        </div>
    )
}