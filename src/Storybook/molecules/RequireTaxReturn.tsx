import * as React from 'react';
import { useState } from 'react';

import { HorizontalSelect } from '../../Shared/Forms/Select/HorizontalSelect';
import DisclaimerText from '../../Shared/PageElements/DisclaimerText';
import { TwoColumnFormRow } from '../../Shared/Forms';

import styles from '../Pages/create-custom-tasks.module.css';

const TaxReturn = () => {
    const [require, setRequire] = useState('null');
    const handleChange = ({ target }) => {
        setRequire(target.value);
    };
    return (
        <div>
            <TwoColumnFormRow>
                <div className={styles.DropdownHeight} onChange={handleChange}>
                    <HorizontalSelect
                        label="Require Tax Returns"
                        id="3"
                        name="Input Select"
                        required
                        selectWidth="100%"
                        column
                        fullHeight
                        //   hideLabel
                    >
                        <option value={'null'}>Do Not Require</option>
                        <option value={'years'}>1 Year</option>
                        <option value={'2 years'}>2 Years</option>
                        <option value={'3 years'}>3 Years</option>
                    </HorizontalSelect>

                    {require != 'null' ? (
                        <div className={styles.DisclaimerMargin}>
                            <DisclaimerText disclaimerText={`Requiring upload of previous ${require} tax returns`} warning />
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </TwoColumnFormRow>
        </div>
    );
};

export default TaxReturn;
