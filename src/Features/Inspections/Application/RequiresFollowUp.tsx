import * as React from 'react';
import { FieldHookConfig, useField } from 'formik';

import { CheckMark, IconColors } from '../../../Icons';
import { FlexWrapper } from '../../../Shared/FlexWrapper';

import styles = require('./requires-followup.module.css')

interface Properties {
    name: string;
    handleChange?: (e: React.ChangeEvent<any>) => void;
}

// TODO: Consolidate form colors
// rgb(220, 220, 220) might be a border?
const toBeColor = 'rgb(220, 220, 220)';

export default (props: Properties): React.ReactElement => {

    const [field] = useField(props as string | FieldHookConfig<any>);

    return (
        <label htmlFor="requires-followup">
            <FlexWrapper
                align="center"
                justify="start"
                className={styles.RequiresFollowUp}
                style={{
                    backgroundColor: field.value ? IconColors.BrandBlue : toBeColor,
                    borderColor: field.value ? IconColors.BrandBlue : toBeColor,
                    margin: '.5rem 0 .5rem'
                }}
            >
                <input
                    id="requires-followup"
                    name={field.name}
                    type="checkbox"
                    className={styles.RequiresFollowUpInput}
                    checked={field.checked}
                    value={field.value}
                    multiple={field.multiple}
                    onBlur={field.onBlur}
                    onChange={!!props.handleChange ? props.handleChange : field.onChange}
                />
                <FlexWrapper
                    align="center"
                    justify="center"
                    style={{
                        width: '2.75rem',
                        height: '3rem',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    {field.value && <CheckMark aspect="1.75rem" color={IconColors.White} />}
                </FlexWrapper>
                <span className={styles.RequiresFollowUpText}>
                    Requires Follow-Up
                </span>
            </FlexWrapper>
        </label>
    );
};
