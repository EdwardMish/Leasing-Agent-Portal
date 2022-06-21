import * as React from 'react';
import { Link, useParams } from 'react-router-dom';

import { IconColors, InspectionNavBarIcons, Tasks } from '../../../Icons';

import { FlexWrapper } from '../../../Shared/FlexWrapper';

import styles = require('./inspections.module.css')

export default (): React.ReactElement => {
    const { propertyId } = useParams<{ propertyId: string }>();

    return (
        <FlexWrapper
            align="center"
            justify="center"
            style={{
                position: 'fixed',
                padding: '1rem',
                bottom: 0,
                left: 0,
                right: 0,
                width: '100%',
            }}
        >
            <FlexWrapper align="center" justify="between" className={styles.NavBar}>
                <Link to={`/app/inspections/${propertyId}`}>
                    <FlexWrapper align="center" justify="center" column>
                        <Tasks color={IconColors.BrandBlue} aspect="1rem" />
                        <p>List</p>
                    </FlexWrapper>
                </Link>
                <Link to={`/app/inspections/${propertyId}/categories`}>
                    <FlexWrapper align="center" justify="center" column>
                        <InspectionNavBarIcons.Categories color={IconColors.BrandBlue} aspect="1rem" />
                        <p>Categories</p>
                    </FlexWrapper>
                </Link>
                <Link to={`/app/inspections/${propertyId}/interactions`}>
                    <FlexWrapper align="center" justify="center" column>
                        <InspectionNavBarIcons.Neighbors color={IconColors.BrandBlue} aspect="1rem" />
                        <p>Interactions</p>
                    </FlexWrapper>
                </Link>
                <Link to={`/app/inspections/${propertyId}/photos`}>
                    <FlexWrapper align="center" justify="center" column>
                        <InspectionNavBarIcons.Photos color={IconColors.BrandBlue} aspect="1rem" />
                        <p>Photos</p>
                    </FlexWrapper>
                </Link>
                <Link to={`/app/inspections/${propertyId}/complete`}>
                    <FlexWrapper align="center" justify="center" column>
                        <InspectionNavBarIcons.Complete color={IconColors.BrandBlue} aspect="1rem" />
                        <p>Complete</p>
                    </FlexWrapper>
                </Link>
            </FlexWrapper>
        </FlexWrapper>
    );
};
