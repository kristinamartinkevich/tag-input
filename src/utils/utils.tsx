
export const highlightMatch = (suggestion: string, query: string) => {
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


export const setCaretToEnd = (element: HTMLElement) => {
    const range = document.createRange();
    const selection = window.getSelection();
    if (selection && element.lastChild) {
        range.selectNodeContents(element);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};