import * as React from 'react';

import { Box, TextField } from '@material-ui/core';
import { DateRange, LocalizationProvider, StaticDateRangePicker } from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import addDays from 'date-fns/addDays';

const styles = require('./daterangepicker.module.css');

export interface DateRangePickerProperties {
    title?: string;
    value: DateRange<Date>;
    onChange: (dateRange: DateRange<Date>) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProperties> = ({ title, value, onChange }) => {
    const currentDate = new Date(Date.now());
    const maxDate = addDays(currentDate, 90);

    return (
        <div className={styles.DateRangePicker}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDateRangePicker
                    toolbarTitle={title}
                    minDate={new Date(Date.now())}
                    maxDate={maxDate}
                    value={value}
                    onChange={onChange}
                    renderInput={(startProps, endProps) => (
                        <>
                            <TextField {...startProps} variant="standard" />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField {...endProps} variant="standard" />
                        </>
                    )}
                />
            </LocalizationProvider>
        </div>
    );
};
