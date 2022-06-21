import * as React from 'react';

const styles = require('./form-fields.module.css');

export const ContactType: React.FC<{}> = () => (
    <fieldset>
        <legend id="contact-type" className={styles.legend}>
            Contact Type
            <span className="required">(required)</span>
        </legend>

        <ul className={styles.radioList} aria-labelledby="contact-type" role="radiogroup">
            <li>
                <label htmlFor="yes">
                    <input id="yes" type="radio" name="ContactTypeID" value="1" />
                    {' '}
                    Onsite/store issues or emergencies
                </label>
            </li>
            <li>
                <label htmlFor="no">
                    <input id="no" type="radio" name="ContactTypeID" value="2" />
                    {' '}
                    Sales reporting
                </label>
            </li>
        </ul>
    </fieldset>
);
