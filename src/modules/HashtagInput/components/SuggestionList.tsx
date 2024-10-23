import React from 'react';
import { useTagInputStore } from '../../../store';
import { highlightMatch } from '../../../utils/utils';

interface SuggestionsListProps {
    handleSuggestionClick: (suggestion: string) => void;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ handleSuggestionClick }) => {
    const { suggestions, suggestionPosition, inputValue } = useTagInputStore();

    if (suggestions.length === 0) return null;

    const lastWord = inputValue.split(' ').pop()!.slice(1);

    return (
        <ul
            className="list-group suggestions position-absolute"
            style={{ top: suggestionPosition.top, left: suggestionPosition.left }}
        >
            {suggestions.map((suggestion, index) => (
                <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="list-group-item"
                >
                    <span className="hashtag">#</span>
                    {highlightMatch(suggestion, lastWord)}
                </li>
            ))}
        </ul>
    );
};

export default SuggestionsList;
