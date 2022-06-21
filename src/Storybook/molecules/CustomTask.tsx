import React, { useState } from 'react';

import { Text } from 'Shared/Forms/Input/Text';
import { HorizontalSelect } from '../../Shared/Forms/Select/HorizontalSelect';
import { TwoColumnFormRow } from '../../Shared/Forms';
import { FlexWrapper } from '../../Shared/FlexWrapper';
import { Label } from '../../Shared/Forms/Label';

import styles from '../Pages/create-custom-tasks.module.css';

const Task = () => {
    const [dropDown, setDropDown] = useState('upload');

    const handleDropDownChange = ({ target }) => {
        setDropDown(target.value);
    };
    return (
        <div>
            <FlexWrapper justify="between" align="start">
                <TwoColumnFormRow>
                    <div className={styles.DropdownHeight} onChange={handleDropDownChange}>
                        <HorizontalSelect
                            label="Task Type"
                            id="3"
                            name="Input Select"
                            required
                            selectWidth="100%"
                            column
                            fullHeight
                            //   hideLabel
                        >
                            <option value="upload">Document Upload</option>
                            <option value="question">Question</option>
                        </HorizontalSelect>
                    </div>
                    {dropDown === 'question' ? (
                        <div>
                            {/* <FormInputs.Text
                                label="Question Subject"
                                placeholder="e.g. Other investments"
                                id="3"
                                name="Phone"
                                // hideLabel={true}
                                required
                                fullWidth
                            /> */}
                        </div>
                    ) : (
                        <div>
                            <Text
                                label="Name of Document"
                                placeholder="e.g. Profit and Loss Statement"
                                id="3"
                                name="Phone"
                                // hideLabel={true}
                                required
                                fullWidth
                            />
                        </div>
                    )}
                </TwoColumnFormRow>
            </FlexWrapper>

            {dropDown === 'question' ? (
                <>
                    <Label id={'text label'} label="Ask Question" required />
                    <textarea className={styles.MockTextArea} placeholder={'Ask Question Here'} />
                </>
            ) : (
                ''
            )}
        </div>
    );
};

export default Task;
