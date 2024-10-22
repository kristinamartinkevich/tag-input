import { useState } from 'react';
import { predefinedTags } from './data';

const TagInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [formattedInput, setFormattedInput] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const words = value.split(' ');
        const lastWord = words[words.length - 1];

        if (lastWord.startsWith('#')) {
            const matches = predefinedTags.filter(tag => ("#" + tag).startsWith(lastWord));
            setSuggestions(matches);
        } else {
            setSuggestions([]);
        }
        updateFormattedInput(value);
    };

    const updateFormattedInput = (text) => {
        const words = text.split(' ').map(word => {
            if (word.startsWith('#')) {
                return `<span class="tag">${word}</span>`;
            }
            return word;
        });
        setFormattedInput(words.join(' '));
    };

    const handleSuggestionClick = (suggestion) => {
        const words = inputValue.split(' ');
        words[words.length - 1] = "#" + suggestion;
        const newInputValue = words.join(' ');
        setInputValue(newInputValue);
        setSuggestions([]);
        updateFormattedInput(newInputValue);
    };

    return (
        <div className="tag-input-container">
            <div className="formatted-input" dangerouslySetInnerHTML={{ __html: formattedInput }}></div>
            <textarea
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type # to tag..."
                className="input-overlay"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            #{suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TagInput;
