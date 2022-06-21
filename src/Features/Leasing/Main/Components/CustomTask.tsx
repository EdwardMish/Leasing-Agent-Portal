import { TaskType } from 'Features/Leasing/Main/Types/TaskType';
import React, { useState } from 'react';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { TextArea, TwoColumnFormRow } from 'Shared/Forms';
import { Text } from 'Shared/Forms/Input/Text';
import { HorizontalSelect } from 'Shared/Forms/Select/HorizontalSelect';
import styles from './custom-task.module.css';

const CustomTask = () => {
    const [dropDown, setDropDown] = useState<TaskType>(TaskType.Document);

    const handleDropDownChange = ({ target }) => {
        setDropDown(target.value);
    };

    return (
        <div>
            <FlexWrapper justify="between" align="start">
                <TwoColumnFormRow>
                    <div className={styles.DropdownHeight} onChange={handleDropDownChange}>
                        <HorizontalSelect label="Task Type" id="3" name="type" required selectWidth="100%" column fullHeight>
                            <option value={TaskType.Document}>Document Upload</option>
                            <option value={TaskType.Question}>Question</option>
                        </HorizontalSelect>
                    </div>
                    <div>
                        {dropDown === TaskType.Document && (
                            <Text
                                label="Name of Document"
                                placeholder="e.g. Profit and Loss Statement"
                                id="3"
                                name="document"
                                required
                                fullWidth
                            />
                        )}
                    </div>
                </TwoColumnFormRow>
            </FlexWrapper>

            {dropDown === TaskType.Question && (
                <>
                    <TextArea
                        name="question"
                        id="question"
                        label="Ask Question"
                        required
                        rows={4}
                        placeholder={'Ask Question Here'}
                    />
                </>
            )}
        </div>
    );
};

export default CustomTask;
