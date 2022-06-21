import * as React from 'react';

import { FlexWrapper } from '../../../Shared/FlexWrapper';
import { FormButtons } from '../../../Shared/Forms';

import CategorySelect from './CategorySelect';

interface CategoryWithSaveRowProps {
    disable: boolean;
}

const CategoryWithSaveRow: React.FC<CategoryWithSaveRowProps> = ({ disable }) => (
    <FlexWrapper align="center" justify="between">
        <CategorySelect />
        <div style={{ width: '6rem', marginLeft: '0.75rem' }}>
            <FormButtons.Submit text="Save" disable={disable} style={{ height: '3rem' }} />
        </div>
    </FlexWrapper>
);

export default CategoryWithSaveRow;
