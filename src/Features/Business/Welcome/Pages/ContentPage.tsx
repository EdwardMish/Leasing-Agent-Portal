import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '../../../../Shared/Button';

import ContentChecklistSnippet from '../../../../Data/Snippets/ContentChecklistSnippet';

import styles = require('../welcome.module.css');

export interface ContentPageProperties {
    title: string;
    nextRoute: string;
}

export const ContentPage: React.FC<ContentPageProperties> = ({ title, nextRoute }) => {
    const history = useHistory();

    return (
        <>
            <h1>{title}</h1>
            <p className={styles.WelcomeParagraphBlock}>
                <ContentChecklistSnippet />
            </p>
            <Button callback={() => history.push(nextRoute)} text='Continue' fullWidth />
        </>
    );
};
