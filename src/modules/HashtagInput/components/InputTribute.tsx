import React, { useEffect, useRef } from 'react';
import Tribute from 'tributejs';
import { predefinedTagTribute } from '../../../utils/data';
import { setCaretToEnd } from '../../../utils/utils';
import { useTagInputStore } from '../../../store';

const TributeInput = () => {
    const { setTributeInputValue } = useTagInputStore();
    const divRef = useRef<HTMLDivElement>(null);
    const tributeRef = useRef<Tribute<any> | null>(null);

    useEffect(() => {
        const tribute = new Tribute({
            collection: [
                {
                    trigger: '#',
                    values: predefinedTagTribute,
                    selectTemplate: (item) => `<span class="highlight">#${item.original.value}</span>&nbsp;`,
                },
            ],
        });

        tributeRef.current = tribute;

        const currentDiv = divRef.current;
        if (currentDiv) {
            tribute.attach(currentDiv);
        }

        return () => {
            if (currentDiv) {
                tribute.detach(currentDiv);
            }
        };
    }, []);

    const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {
        const text = e.currentTarget.innerHTML;
        setTributeInputValue(text);

        if (!tributeRef.current?.isActive) {
            highlightUnrecognizedHashtags(text);
            setCaretToEnd(divRef.current);
        }
    };

    const highlightUnrecognizedHashtags = (text: string) => {
        const hashtagRegex = /#(\w+)/g;
        const updatedText = text.replace(hashtagRegex, (match, tag) => {
            const isValidTag = predefinedTagTribute.some(item => item.value === tag);
            return isValidTag ? match : `<span class="highlight">#${tag}</span>`;
        });

        if (divRef.current && updatedText !== text) {
            divRef.current.innerHTML = updatedText;
        }
    };

    return (
        <div className="tag-input-container">
            <div
                ref={divRef}
                contentEditable
                onInput={handleInputChange}
                className="tag-input-div form-control"
                role="textbox"
            />
        </div>
    );
};

export default TributeInput;
