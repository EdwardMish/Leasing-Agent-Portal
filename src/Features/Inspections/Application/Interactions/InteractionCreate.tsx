import * as React from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import Modal from 'Shared/Modal/Modal';

import { SpinningLoader } from '../../../../Icons/Animated';

import { Button } from '../../../../Shared/Button/Button';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';

import useActiveInteractionFromState from '../../../../State/Inspections/App/Hooks/useActiveInteractionFromState';

import { Note } from '../../../../State/Inspections/Types/Note';

import DeleteInteractionModal from '../DeleteInteractionModal';
import CreateForm from './CreateForm';

export default (): React.ReactElement => {
    const history = useHistory();

    const { propertyId: propertyIdParam } = useParams<{ propertyId: string }>();
    const propertyId = parseInt(propertyIdParam, 10);

    const {
        hasActiveInteraction,
        activeInteraction,
        addNote,
        updateNote,
        addPhoto,
        setOccupant,
        resetActiveInteraction,
        completeActiveInteraction,
    } = useActiveInteractionFromState(propertyId);

    const [showProgressModal, toggleShowProgressModal] = React.useState<boolean>(false);
    const [showCancelModal, toggleCancelModal] = React.useState<boolean>(false);
    const [bypassActiveInteractionCheck, setBypassActiveInteractionCheck] = React.useState<boolean>(!hasActiveInteraction);

    const [creationCompleted, setCreationCompleted] = React.useState<boolean>(false);

    const { url } = useRouteMatch();

    const interactionListUrl = url.substr(0, url.lastIndexOf('/'));

    const createInteraction = async (occupantId: number) => {
        toggleShowProgressModal(true);

        await completeActiveInteraction();

        setCreationCompleted(true);

        history.push(interactionListUrl);
    };

    const deleteInteraction = () => {
        resetActiveInteraction();

        history.push(interactionListUrl);
    };

    const saveNote = async (note: Note): Promise<void> => {
        if (activeInteraction.notes.some((n) => n.id === note.id)) {
            updateNote(note);
        } else {
            addNote(note);
        }
    };

    return (
        <>
            {hasActiveInteraction && !bypassActiveInteractionCheck && (
                <Modal header="Continue Interaction?">
                    <FlexWrapper align="center" justify="center" column>
                        <p style={{ padding: '.5rem' }}>A previous interaction was started, but not completed.</p>
                        <p style={{ padding: '.5rem' }}>Would you like to continue with the previous interaction?</p>
                    </FlexWrapper>
                    <FlexWrapper align="center" justify="around" style={{ margin: '1rem' }}>
                        <Button
                            callback={() => {
                                resetActiveInteraction();
                                setBypassActiveInteractionCheck(true);
                            }}
                            text="No"
                            inverse
                            style={{ width: 'calc(50% - .5rem)' }}
                        />
                        <Button
                            callback={() => setBypassActiveInteractionCheck(true)}
                            text="Yes"
                            style={{ width: 'calc(50% - .5rem)' }}
                        />
                    </FlexWrapper>
                </Modal>
            )}
            <CreateForm
                propertyId={propertyId}
                interaction={activeInteraction}
                setOccupant={setOccupant}
                saveNote={saveNote}
                savePhoto={addPhoto}
                completeInteraction={createInteraction}
            />
            {showCancelModal && (
                <DeleteInteractionModal handleConfirm={deleteInteraction} handleCancel={() => toggleCancelModal(false)} />
            )}
            {showProgressModal && (
                <Modal header="Creating Interaction">
                    {!creationCompleted && (
                        <FlexWrapper align="center" justify="center" style={{ margin: '1rem' }}>
                            <SpinningLoader aspect="2rem" />
                        </FlexWrapper>
                    )}
                    <FlexWrapper align="center" justify="center" style={{ margin: '1rem' }}>
                        {creationCompleted ? (
                            <p>Interaction Saved. Please select continue to go back to the inspection.</p>
                        ) : (
                            <p>Completing Interaction, please wait.</p>
                        )}
                    </FlexWrapper>
                    {creationCompleted && (
                        <div style={{ padding: '.5rem' }}>
                            <Button
                                callback={() => {
                                    toggleShowProgressModal(false);
                                    history.goBack();
                                }}
                                text="Continue"
                                fullWidth
                                withMarginTop
                            />
                        </div>
                    )}
                </Modal>
            )}
        </>
    );
};

