import { ChangeEvent, useState } from 'react';
import Autocomplete from './TagInput';

const TextInput = () => {
    const [tags, setTags] = useState<string[]>([]);

    const handleKeydown = (e: ChangeEvent<HTMLInputElement> & KeyboardEvent) => {
        if (e.key !== 'Enter') {
            return;
        }
        const value = e.target.value;
        if (!value.trim()) {
            return;
        }

        setTags((tags: string[]) => {
            if (tags.some((tag) => tag.toLowerCase() === value.toLowerCase())) {
                return [...tags];
            } else {
                return [...tags, value];
            }
        });
        e.target.value = '';
    };

    function removeTag(idx) {
        setTags(tags.filter((el, i) => i !== idx));
    }
    return (
        <div className='text-input-container'>
            {tags.map((tag, i) => {
                return (
                    <div className='tag-item' key={tag + i}>
                        <span className='text'>{tag}</span>
                        <span className='close' onClick={() => removeTag(i)}>
                            &times;
                        </span>
                    </div>
                );
            })}
            <Autocomplete
                possibleValues={['test', 'megatest']}
                handleKeydown={handleKeydown}
                setTags={setTags}
            />
        </div>
    );
};
export default TextInput;