import { IconColors, Pencil } from 'Icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { Divider } from 'Shared/PageElements';
import Title from 'Shared/PageElements/Title';

const ReviewPanel = ({ title, editLink, children, Icon = Pencil }): React.ReactElement => (
    <>
        <FlexWrapper column align="center" justify="between">
            <FlexWrapper align="start" justify="between" fullWidth>
                <Title title={title} level="h2" />

                <Link to={editLink}>
                    <Icon aspect="1.5rem" color={IconColors.BrandBlue} />
                </Link>
            </FlexWrapper>
        </FlexWrapper>
        <FlexWrapper align="start" justify="start" style={{ marginBottom: '1rem' }}>
            {children}
        </FlexWrapper>
        <Divider />
    </>
);

export default ReviewPanel;
