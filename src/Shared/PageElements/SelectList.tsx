import * as React from 'react';

import styles from './select-list.module.css';

interface SelectListProps {
  options: any[];
  handler: (value: any) => void;
}

export const SelectList: React.FC<SelectListProps> = ({ handler, options }) => {
  const [currentValue, setCurrentValue] = React.useState<any>(options[0].value);
  const [showOptions, toggleOptions] = React.useState<boolean>(false);

  const handleList = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    toggleOptions(true);
  };

  const handleClick = (value: any) => {
    setCurrentValue(value);

    handler(value);

    toggleOptions(false);
  };

  return (
    <>
      <div className={styles.SelectList}>
        <p className={styles.SelectListCurrent} onClick={handleList}>
          {options.find((i) => i.value === currentValue).display}
        </p>
        {showOptions && (
          <div className={styles.SelectListOptions}>
            {options.map((option: any) => (
              <p
                key={`select-list-${option.value}`}
                onClick={() => handleClick(option.value)}
              >
                {option.display}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
