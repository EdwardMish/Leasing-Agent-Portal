import React, { useState, useEffect } from 'react';

import { FlexWrapper } from 'Shared/FlexWrapper';
import Modal from 'Shared/Modal/Modal';
import { Button } from 'Shared/Button';
import { SpinningLoader } from 'Icons/Animated';
import { CheckMark, IconColors } from 'Icons';
import { Title } from 'Shared/PageElements';

export interface ModalMarqueeProps {
    showModal: boolean;
    showButton: boolean;
    content: string[];
    seconds: number;
    title: string;
    onCloseModalHandler?: () => void;
    onClickButtonHandler?: () => void;
    disableButton: boolean;
    buttonText: string;
    icon?: 'checkMark' | 'spinningLoader';
    multipleIterations?: boolean; // if false, it continues circling the content, it doesn't stop on the first interval
}

const ModalMarquee = ({
    showModal = false,
    showButton = true,
    content = [],
    seconds = 5,
    icon = 'spinningLoader',
    title = 'Thank you',
    buttonText = 'Next Steps',
    onCloseModalHandler,
    disableButton = true,
    onClickButtonHandler,
    multipleIterations = false,
}: ModalMarqueeProps): React.ReactElement => {
    const [contentIndex, setContentIndex] = useState(-1); //it must be initialized in -1 to let the next useEffect initialize it as 0
    const [intervalId, setIntervalId] = useState<number>();

    useEffect(() => {
        if (content) {
            const intervalId = window.setInterval(() => {
                setContentIndex((currentIndex) => (currentIndex + 1) % content.length); // circled indexes as safewards
            }, seconds * 1000);

            setIntervalId(intervalId);

            return () => {
                //when the component is unmounted, it must clear the interval
                window.clearInterval(intervalId);
                setContentIndex(0);
            };
        }

        return;
    }, [content]);

    useEffect(() => {
        //when the modal is closed, the interval must be stopped

        if (!showModal && intervalId) {
            window.clearInterval(intervalId);
            setContentIndex(0);
        }
    }, [showModal]);

    useEffect(() => {
        //also, when the index reaches the last index (length-1) the interval must be stopped
        if (contentIndex === content.length - 1 && intervalId && !multipleIterations) {
            window.clearInterval(intervalId);
            setContentIndex(0);
        }
    }, [contentIndex]);

    // RENDER:

    if (!showModal) return <></>;

    return (
        <Modal callBack={onCloseModalHandler} header={title} style={{ width: '15rem', height: '12rem' }}>
            <FlexWrapper column justify="between" align="center">
                <FlexWrapper
                    justify="between"
                    align="center"
                    gap="0.5rem"
                    style={{ marginTop: '1rem', marginBottom: '1rem' }}
                >
                    {icon === 'checkMark' ? <CheckMark aspect="1rem" /> : <SpinningLoader aspect="1rem" />}
                    <Title title={content[contentIndex]} color={IconColors.BrandBlue} level="h4" noMarginBottom />
                </FlexWrapper>

                {showButton && <Button text={buttonText} callback={onClickButtonHandler} disable={disableButton} />}
            </FlexWrapper>
        </Modal>
    );
};

export default ModalMarquee;
