import { useRef, ChangeEvent } from 'react';
import { predefinedTags } from '../../../utils/data';
import { useTagInputStore } from '../../../store';
import SuggestionsList from './SuggestionList';

const TagInput = () => {
    const {
        inputValue,
        formattedInput,
        setInputValue,
        setSuggestions,
        setFormattedInput,
        setSuggestionPosition,
    } = useTagInputStore();

    const textareaRef = useRef(null);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInputValue(value);

        const words = value.split(' ');
        const lastWord = words[words.length - 1];

        if (lastWord.startsWith('#')) {
            const matches = predefinedTags.filter(tag => ("#" + tag).startsWith(lastWord));
            setSuggestions(matches);
            updateSuggestionPosition();
        } else {
            setSuggestions([]);
        }
        updateFormattedInput(value);
    };

    const updateFormattedInput = (text: string) => {
        const words = text.split(' ').map(word => {
            if (word.startsWith('#')) {
                return `<span class="tag">${word}</span>`;
            }
            return word;
        });
        setFormattedInput(words.join(' '));
    };

    const updateSuggestionPosition = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            const cursorPos = textarea.selectionEnd;
            const textBeforeCursor = textarea.value.slice(0, cursorPos);
            const lines = textBeforeCursor.split('\n');
            const lineCount = Math.ceil(textBeforeCursor.length / 21);
            const currentLine = lines[lines.length - 1];
            const lineHeight = 24;

            const top = window.scrollY + (lineCount * lineHeight);
            const left = currentLine.length * 2;

            setSuggestionPosition({ top, left });
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        const words = inputValue.split(' ');
        words[words.length - 1] = "#" + suggestion;
        const newInputValue = words.join(' ');
        setInputValue(newInputValue);
        setSuggestions([]);
        updateFormattedInput(newInputValue);
    };

    const highlightMatch = (suggestion: string, query: string) => {
        const index = suggestion.toLowerCase().indexOf(query.toLowerCase());
        if (index === -1) return suggestion;

        const beforeMatch = suggestion.slice(0, index);
        const match = suggestion.slice(index, index + query.length);
        const afterMatch = suggestion.slice(index + query.length);

        return (
            <>
                {beforeMatch}
                <span className="highlight">{match}</span>
                {afterMatch}
            </>
        );
    };


    return (
        <div className="tag-input-container">
            <div
                className="formatted-input"
                dangerouslySetInnerHTML={{ __html: formattedInput }}
            ></div>
            <textarea rows={4}
                ref={textareaRef}
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type # to tag..."
                className="input-overlay form-control"
            />
            <SuggestionsList
                handleSuggestionClick={handleSuggestionClick}
                highlightMatch={highlightMatch}
            />
        </div>
    );
};

export default TagInput;
