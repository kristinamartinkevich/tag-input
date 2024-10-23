import { useRef, ChangeEvent } from 'react';
import { CHAR_PER_LINE, LINE_HEIGHT, predefinedTags } from '../../../utils/data';
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

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const updateFormattedInput = (text: string) => {
        const words = text.split(' ').map(word =>
            word.startsWith('#') ? `<span class="tag">${word}</span>` : word
        );
        setFormattedInput(words.join(' '));
    };

    const updateSuggestions = (lastWord: string) => {
        if (lastWord.startsWith('#')) {
            const matches = predefinedTags.filter(tag => ("#" + tag).startsWith(lastWord));
            setSuggestions(matches);
        } else {
            setSuggestions([]);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInputValue(value);

        const words = value.split(' ');
        const lastWord = words[words.length - 1];

        updateSuggestions(lastWord);
        updateFormattedInput(value);
        updateSuggestionPosition();
    };

    const updateSuggestionPosition = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            const cursorPos = textarea.selectionEnd;
            const textBeforeCursor = textarea.value.slice(0, cursorPos);
            const lines = textBeforeCursor.split('\n');
            const lineCount = Math.ceil(textBeforeCursor.length / CHAR_PER_LINE);
            const currentLine = lines[lines.length - 1];

            const top = window.scrollY + (lineCount * LINE_HEIGHT);
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

    return (
        <div className="tag-input-container">
            <div
                className="formatted-input"
                dangerouslySetInnerHTML={{ __html: formattedInput }}
            />
            <textarea
                rows={4}
                ref={textareaRef}
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type # to hashtag..."
                className="form-control"
            />
            <SuggestionsList
                handleSuggestionClick={handleSuggestionClick}
            />
        </div>
    );
};

export default TagInput;
