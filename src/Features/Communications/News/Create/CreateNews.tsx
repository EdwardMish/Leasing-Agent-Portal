import * as React from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DateRange } from '@material-ui/lab';
import { Field, Form, Formik } from 'formik';

import { News } from '../../../../API';
import { addErrorMessage } from '../../../../State/GlobalMessages/actionCreators';

import { Close, Upload } from '../../../../Icons';

import { DateRangePicker } from '../../../../Shared/DateRangePicker';
import Editor from '../../../../Shared/Forms/Editor';
import { FormButtons, FormInputs, FormRow } from '../../../../Shared/Forms';
import { Label } from '../../../../Shared/Forms/Label';
import { SelectFromAllOccupants, useSelectFromAllOccupants } from '../../../../Shared/PropertyTenantResolution';
import UploadFiles from '../../../../Shared/UploadFiles';

const styles = require('./create.module.css');
const formStyles = require('../../../../Shared/Forms/forms.module.css');

const CreateNews: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch();

    const history = useHistory();

    const [attachments, setAttachments] = React.useState<File[]>([]);

    const [properties, selectedOccupants, visibleOccupants, propertiesAreLoaded, toggleOccupantSelection, searchHandler] =
        useSelectFromAllOccupants();

    const handleFiles = (files: File[]) => {
        setAttachments([...attachments, ...files]);
    };

    const handleFileRemoval = (file: File) => {
        const fileIndex: number = attachments.findIndex(
            (a: File) => a.name === file.name && a.lastModified === file.lastModified
        );

        if (fileIndex > -1) {
            setAttachments([...attachments.slice(0, fileIndex), ...attachments.slice(fileIndex + 1)]);
        }
    };

    const createNewsItem = (
        type: News.Types.NewsTypes,
        subject: string,
        description: string,
        occupants: string[],
        publishFrom: Date,
        publishTo: Date
    ) => {
        News.API.createNewsItem(type, subject, description, occupants, publishFrom, publishTo)
            .then((newsItemId) => {
                if (attachments && attachments.length > 0) {
                    News.API.addAttachments(newsItemId, attachments)
                        .then(() => {
                            history.push(`/communications/news/details/${newsItemId}`);
                        })
                        .catch((err) => {
                            dispatch(addErrorMessage('We were not able to add the attachments. Please try again.'));
                        });
                }

                history.push(`/communications/news/details/${newsItemId}`);
            })
            .catch(() => {
                dispatch(addErrorMessage('We were not able to create your News item. Please try again.'));
            });
    };

    const currentDateAndTime = new Date(Date.now());

    const currentDate = new Date(
        currentDateAndTime.getFullYear(),
        currentDateAndTime.getMonth(),
        currentDateAndTime.getDate()
    );
    const currentDatePlus30Days = new Date(new Date(currentDate).setDate(currentDate.getDate() + 30));

    return (
        <div className={styles.NewRequestForm}>
            <h1>Create News</h1>
            <Formik
                initialValues={{
                    occupants: [] as string[],
                    subject: '',
                    description: '',
                    publishFrom: currentDate,
                    publishTo: currentDatePlus30Days,
                    type: News.Types.NewsTypes.Normal,
                }}
                onSubmit={(values) => {
                    // set the occupants based on the hook, not the form for now until
                    // this can be resolved
                    values.occupants = selectedOccupants.map((o) => o.toString());

                    createNewsItem(
                        values.type,
                        values.subject,
                        values.description,
                        values.occupants,
                        values.publishFrom,
                        values.publishTo
                    );
                }}
                validationSchema={Yup.object({
                    occupants: Yup.array().test(
                        'occupant',
                        'Please select a Neighbor(s)',
                        (occ) => !!selectedOccupants && selectedOccupants.length > 0
                    ),
                    subject: Yup.string().required('A subject is required'),
                    description: Yup.string().required('A description is required'),
                    publishFrom: Yup.date().required('A publish from date is required'),
                    publishTo: Yup.date()
                        .required('A publish to date is required')
                        .when('publishFrom', (publishFrom, schema) => {
                            if (publishFrom) {
                                const dayAfter: Date = new Date(publishFrom.getTime() + 86400000);

                                return schema.min(dayAfter, 'The publishTo date has to be more than the publishFrom date');
                            }

                            return schema;
                        }),
                })}
            >
                {({ values, errors, setFieldValue, isSubmitting }) => (
                    <Form>
                        <p className={styles.MockLabel}>Select Neighbor(s)</p>
                        <div className={styles.LocationSelector}>
                            <SelectFromAllOccupants
                                properties={properties}
                                selectedOccupants={selectedOccupants}
                                visibleOccupants={visibleOccupants}
                                propertiesAreLoaded={propertiesAreLoaded}
                                toggleOccupants={toggleOccupantSelection}
                                searchHandler={searchHandler}
                            />
                            {errors.occupants && (
                                <div className={formStyles.Error}>
                                    <span>{errors.occupants}</span>
                                </div>
                            )}
                        </div>
                        <FormRow>
                            <FormInputs.Text id="" name="subject" label="Enter Subject" required fullWidth />
                        </FormRow>
                        <FormRow>
                            <Editor
                                id="description"
                                name="description"
                                required
                                label="Enter Description"
                                placeholder="Enter Description..."
                            />
                        </FormRow>
                        <div className={`${styles.FormRow} ${styles.TwoColumnRow}`}>
                            <div className={styles.Attachments}>
                                <div className={styles.AddAttachmentsInput}>
                                    <UploadFiles addFilesCallback={handleFiles}>
                                        <div className={styles.AddAttachment}>
                                            <Upload />
                                            <p>Upload Files</p>
                                        </div>
                                    </UploadFiles>
                                </div>
                                <div className={styles.CurrentFiles}>
                                    <p className={styles.MockLabel}>Attachments</p>
                                    {attachments.length ? (
                                        attachments.map((file: File) => (
                                            <div
                                                className={styles.CurrentFileRow}
                                                key={`attachment-${file.name}-${file.lastModified}`}
                                            >
                                                <p>{file.name}</p>
                                                <div
                                                    className={styles.CurrentFileRowIcon}
                                                    onClick={() => handleFileRemoval(file)}
                                                >
                                                    <Close aspect="1rem" />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className={styles.CurrentFileRow}>
                                            <p>No attachments</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <FormRow>
                            <Label id="subject" label="Select Publish Dates" required />
                            <Field type="hidden" name="publishFrom" value={values.publishFrom} />
                            <Field type="hidden" name="publishTo" value={values.publishTo} />
                            <DateRangePicker
                                title=""
                                value={[values.publishFrom, values.publishTo]}
                                onChange={(dates: DateRange<Date>) => {
                                    setFieldValue('publishFrom', dates[0]);
                                    setFieldValue('publishTo', dates[1] ? dates[1] : dates[0]);
                                }}
                            />
                            {errors.publishFrom && (
                                <div className={formStyles.Error}>
                                    <span>{errors.publishFrom}</span>
                                </div>
                            )}
                            {errors.publishTo && (
                                <div className={formStyles.Error}>
                                    <span>{errors.publishTo}</span>
                                </div>
                            )}
                        </FormRow>
                        <FormButtons.Submit text="Create News" disable={isSubmitting} />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateNews;
