import { useState } from "react";

const KeywordInput = ({ keywords = [], onChange, suggestions = [] }) => {
    const [inputValue, setInputValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredSuggestions = suggestions.filter(
        (suggestion) =>
            suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
            !keywords.includes(suggestion)
    );

    const addKeyword = (keyword) => {
        if (keyword.trim() && !keywords.includes(keyword.trim())) {
            onChange([...keywords, keyword.trim()]);
            setInputValue("");
            setShowSuggestions(false);
        }
    };

    const removeKeyword = (index) => {
        onChange(keywords.filter((_, i) => i !== index));
    };

    return (
        <div className="keyword-input">
            <div className="keywords-list">
                {keywords.map((keyword, index) => (
                    <span key={index} className="keyword-tag">
                        {keyword}
                        <button
                            type="button"
                            onClick={() => removeKeyword(index)}
                            className="keyword-remove"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
            <div className="keyword-input-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addKeyword(inputValue);
                        }
                    }}
                    placeholder="Enter key word..."
                    className="keyword-input-field"
                />
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="suggestions">
                        {filteredSuggestions
                            .slice(0, 5)
                            .map((suggestion, index) => (
                                <div
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => addKeyword(suggestion)}
                                >
                                    {suggestion}
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default KeywordInput;
