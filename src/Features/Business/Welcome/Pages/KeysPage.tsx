import KeysSnippet from 'Data/Snippets/KeysSnippet';
import React from 'react';
import { CheckBox } from 'Shared/FormFields/CheckBox';
import styles = require('../welcome.module.css');
import WelcomeButtonLink from '../WelcomeButtonLink';

interface Properties {
    nextRoute: string;
}

function KeysPage({ nextRoute }: Properties): JSX.Element {
    const [accepted, setAcceptedStatus] = React.useState<boolean>(false);

    return (
        <>
            <h1>Keys</h1>
            <div className={styles.WelcomeParagraphBlock}>
                <KeysSnippet />
            </div>
            <CheckBox
                name="key-agreement"
                id="key-agreement"
                label={'I have read, understand and agree to follow the instructions listed above.'}
                checkedByDefault={false}
                required={true}
                handler={setAcceptedStatus}
            />
            {accepted && <WelcomeButtonLink link={nextRoute} display="Agree and Continue" />}
        </>
    );
}

export default KeysPage;
