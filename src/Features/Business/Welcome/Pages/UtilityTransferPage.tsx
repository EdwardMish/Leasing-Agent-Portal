import * as React from 'react';

import UtilityTransferSnippet from '../../../../Data/Snippets/UtilityTransferSnippet';
import { CheckBox } from '../../../../Shared/FormFields';
import WelcomeButtonLink from '../WelcomeButtonLink';

import styles = require('../welcome.module.css');

interface Properties {
    nextRoute: string;
}

const UtilityTransferPage: React.FC<Properties> = ({ nextRoute }) => {
    const [accepted, setAcceptedStatus] = React.useState<boolean>(false);

    return (
        <>
            <h1>Utility Transfer</h1>
            <div className={styles.WelcomeParagraphBlock}>
                <UtilityTransferSnippet />
            </div>
            <CheckBox
                name="utility-transfer-agreement"
                id="utility-transfer-agreement"
                label={'I have read, understand and agree to transfer all utilities upon the delivery of the space.'}
                checkedByDefault={false}
                required={true}
                handler={setAcceptedStatus}
            />
            {accepted && <WelcomeButtonLink link={nextRoute} display="Agree and Continue" />}
        </>
    );
};

export default UtilityTransferPage;
