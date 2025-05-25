const TextInput = ({ label, value, onChange, error, ...props }) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                className={error ? "error" : ""}
                {...props}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default TextInput;
