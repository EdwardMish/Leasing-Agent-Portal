import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalWithAction from 'Shared/Modal/ModalWithAction';
import { News } from '../../../../API';
import { Button } from '../../../../Shared/Button';
import { Inputs, useControlledForm } from '../../../../Shared/FormFields';
import { FeatureFlags } from '../../../../State';
import { addErrorMessage, addSuccessMessage } from '../../../../State/GlobalMessages/actionCreators';

const { selectors, Types } = FeatureFlags;

interface QuestionButtonProperties {
    newsItemId: number;
}

export const QuestionButton: React.FC<QuestionButtonProperties> = ({ newsItemId }) => {
    const dispatch = useDispatch();

    const featureFlagsAreLoaded = useSelector(selectors.featureFlagsAreLoaded);
    const featureIsEnabled = useSelector(selectors.featureIsEnabled(Types.FeatureFlags.CONVERSATIONS));

    const [modal, toggleModal] = React.useState<boolean>(false);

    const [inputValue, handler] = useControlledForm();

    const submitQuestion = () => {
        News.API.askQuestion(newsItemId, inputValue)
            .then(() => {
                dispatch(
                    addSuccessMessage(
                        'Thank you for asking a question.',
                        'Answers will be provided in the "conversation bubble" located on the upper right-hand side of the screen.',
                    ),
                );

                toggleModal(false);
            })
            .catch((err) => {
                dispatch(addErrorMessage(`Your question was not received: ${err}`));
            });
    };

    return (
        <>
            {featureFlagsAreLoaded && featureIsEnabled ? (
                <>
                    <Button
                        callback={() => {
                            toggleModal(!modal);
                        }}
                        text="Ask a Question"
                        withMarginTop
                        withMarginBottom
                        disable={modal}
                    />
                    {modal && (
                        <ModalWithAction
                            header="Ask a Question"
                            actionText="Submit Question"
                            actionCallback={submitQuestion}
                            cancelCallback={() => toggleModal(false)}
                        >
                            <div style={{ padding: '1rem' }}>
                                <Inputs.TextArea
                                    id="ask-a-question"
                                    name="Ask a question about the news item"
                                    handler={handler}
                                    value={inputValue}
                                    formRow
                                />
                            </div>
                        </ModalWithAction>
                    )}
                </>
            ) : (
                <div />
            )}
        </>
    );
};

