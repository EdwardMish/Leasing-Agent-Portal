import * as React from 'react';

import { InteractiveIcon, IconColors, Remove } from '../../Icons';

const debounce = require('lodash.debounce');

const styles = require('./search.module.css');

interface SearchProps {
    handler: (value: string) => void;
    cleanUpCallback?: () => void;
    clearCallback?: () => void;
    debounceDelay?: number;
    forceClear?: boolean;
    keyboardHandler?: (value: string) => void;
    placeholder?: string;
    initialValue?: string;
}

export const Search: React.FC<SearchProps> = ({
    handler,
    placeholder = 'Search',
    cleanUpCallback,
    clearCallback,
    keyboardHandler,
    forceClear = false,
    debounceDelay = 200,
    initialValue = '',
}) => {
    const [inputValue, setInputValue] = React.useState<string>(initialValue);
    const [wasFocused, setWasFocused] = React.useState<boolean>(false);

    const clearComponent = () => {
        setInputValue('');

        if (clearCallback) clearCallback();

        setWasFocused(false);
    };

    const debounceSearch = React.useRef(
        debounce((searchTerm) => {
            handler(searchTerm);
        }, debounceDelay),
    );

    const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        const { value } = target;

        setInputValue(value);
    };

    const handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        const { value } = target;

        if (!value) clearComponent();
    };

    const handleFocus = () => {
        setWasFocused(true);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!keyboardHandler) return;

        if (e.keyCode === 13) keyboardHandler(inputValue);
    };

    React.useEffect(() => {
        if (wasFocused) debounceSearch.current(inputValue);
    }, [inputValue]);

    React.useEffect(() => {
        if (forceClear) clearComponent();

        return () => {
            if (cleanUpCallback) cleanUpCallback();
        };
    }, [forceClear]);

    return (
        <div className={styles.Search}>
            <input
                className={`${styles.SearchInput} ${wasFocused ? styles.SearchInputActive : styles.SearchInputInactive}`}
                type="text"
                value={inputValue}
                onChange={inputHandler}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyPress}
                placeholder={placeholder}
            />
            {wasFocused && (
                <div className={styles.ClearSearch}>
                    <InteractiveIcon
                        action={clearComponent}
                        aspect="2.5rem"
                        iconAspect="1.5rem"
                        color={IconColors.LightGrey}
                        Icon={Remove}
                    />
                </div>
            )}
        </div>
    );
};

