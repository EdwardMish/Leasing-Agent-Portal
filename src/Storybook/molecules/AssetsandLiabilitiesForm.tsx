import { AccountType } from 'Features/Leasing/Application/Types/AccountType';
import * as React from 'react';
import { FlexWrapper } from '../../Shared/FlexWrapper';
import { FormInputs, FormRow, TwoColumnFormRow } from '../../Shared/Forms';
import { HorizontalSelect } from '../../Shared/Forms/Select/HorizontalSelect';
import UploadStatementDescription from '../../Shared/PageElements/UploadStatmentDescription';
import styles from '../Pages/assets-liabilities.module.css';
import TenantUpload from '../Pages/TenantUpload';

const AssetsLiabilitiesForm = ({
    handleAccountChange,
    handleOtherChange,
    joint,
    amount,
    number,
    title,
    dd1opt1,
    dd1opt2,
    dd1opt3,
    dd1opt4,
}) => {
    return (
        <>
            <FlexWrapper justify="between" align="start">
                <TwoColumnFormRow>
                    <div className={styles.LeadInputHalfDropdown} onChange={handleOtherChange}>
                        <HorizontalSelect
                            label={`${title} Type`}
                            id={`${title} Type`}
                            name={`${title} Type`}
                            required
                            selectWidth="100%"
                            column
                            fullHeight
                        >
                            <option value={dd1opt1}>{dd1opt1}</option>
                            <option value={dd1opt2}>{dd1opt2}</option>
                            <option value={dd1opt3}>{dd1opt3}</option>
                            <option value={dd1opt4}>{dd1opt4}</option>
                        </HorizontalSelect>
                    </div>
                    {amount != 'Other' ? (
                        <div>
                            <FormInputs.Number
                                label={`${title} Amount`}
                                id={`${title} Amount`}
                                name={`${title} Amount`}
                                required
                                fullWidth
                            />
                        </div>
                    ) : (
                        ''
                    )}
                </TwoColumnFormRow>
            </FlexWrapper>
            {amount == 'Other' ? (
                <FlexWrapper justify="between" align="start">
                    <TwoColumnFormRow>
                        <div className={styles.LeadInputHalf}>
                            <FormInputs.Text
                                label={`Other ${title} Name`}
                                id={`Other ${title} Name`}
                                name={`Other ${title} Name`}
                                required
                                fullWidth
                            />
                        </div>
                        <div className={styles.LeadInputHalf}>
                            <FormInputs.Number
                                label={`${title} Amount`}
                                id={`${title} Amount`}
                                name={`${title} Amount`}
                                required
                                fullWidth
                            />
                        </div>
                    </TwoColumnFormRow>
                </FlexWrapper>
            ) : (
                ''
            )}
            <FlexWrapper justify="between" align="start">
                <TwoColumnFormRow>
                    <div className={styles.LeadInputHalfDropdown} onChange={handleAccountChange}>
                        <HorizontalSelect
                            label="Account Type"
                            id="3"
                            name="Account Type"
                            required
                            selectWidth="100%"
                            column
                            fullHeight
                        >
                            <option value={AccountType.Individual}>Individual</option>
                            <option value={AccountType.Joint}>Joint</option>
                        </HorizontalSelect>
                    </div>
                    {joint == AccountType.Individual ? (
                        ''
                    ) : (
                        <div>
                            <FormInputs.Text label="Account Co-Owner" id="3" name="Joiner" required fullWidth />
                        </div>
                    )}
                </TwoColumnFormRow>
            </FlexWrapper>
            <FormRow>
                <FormInputs.Text label="Nickname" id="nickname" name="nickname" required fullWidth />
            </FormRow>
            <div>
                {amount == 'Cash' ? (
                    <>
                        <UploadStatementDescription uploadReason={amount} document="Bank Statement" />
                        <TenantUpload document={'Bank Statement'} />
                    </>
                ) : amount == 'Loan' ? (
                    <>
                        <UploadStatementDescription uploadReason={amount} document="Loan Statement" />
                        <TenantUpload document={'Bank Statement'} />
                    </>
                ) : amount == 'Credit Card' ? (
                    <>
                        <UploadStatementDescription uploadReason={amount} document="Credit Card Statement" />
                        <TenantUpload document={'Bank Statement'} />
                    </>
                ) : (
                    ''
                )}
            </div>
        </>
    );
};

export default AssetsLiabilitiesForm;
