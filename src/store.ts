import { create } from 'zustand';

interface TagInputState {
    inputValue: string;
    tributeInputValue: string;
    suggestions: string[];
    formattedInput: string;
    suggestionPosition: { top: number; left: number };
    setTributeInputValue: (value: string) => void;
    setInputValue: (value: string) => void;
    setSuggestions: (suggestions: string[]) => void;
    setFormattedInput: (formatted: string) => void;
    setSuggestionPosition: (position: { top: number; left: number }) => void;
}

export const useTagInputStore = create<TagInputState>((set) => ({
    inputValue: '',
    tributeInputValue: '',
    suggestions: [],
    formattedInput: '',
    suggestionPosition: { top: 0, left: 0 },
    setInputValue: (value) => set({ inputValue: value }),
    setTributeInputValue: (value) => set({ tributeInputValue: value }),
    setSuggestions: (suggestions) => set({ suggestions }),
    setFormattedInput: (formatted) => set({ formattedInput: formatted }),
    setSuggestionPosition: (position) => set({ suggestionPosition: position }),
}));
