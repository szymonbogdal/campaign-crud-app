const SelectInput = ({ label, value, onChange, error, options, ...props }) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <select
                value={value}
                onChange={onChange}
                className={error ? "error" : ""}
                {...props}
            >
                <option value="">Select {label.toLowerCase()}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default SelectInput;
