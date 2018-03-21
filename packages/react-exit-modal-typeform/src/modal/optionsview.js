/**
 * External Dependencies
 */
import React from 'react';
import Button from './button';
import classNames from 'classnames';

export default function ExitModalOptions({
        onClose,
        onDoSurvey,
        introText,
        doSurveyButtonText,
        skipButtonText,
        doSurveyButtonClass,
        closeModalButtonClass
    }) {
    const buttonClass = "ee-cancel-prompt-button";
    return (
        <div className={'exit-modal-choices'}>
            <p>{introText}</p>
            <Button
                key={'do survey'}
                handleOnClick={onDoSurvey}
                buttonText={doSurveyButtonText}
                buttonClass={classNames(buttonClass, 'do-survey', doSurveyButtonClass)}
            />
            <Button
                key='close-modal-and-cancel'
                handleOnClick={onClose}
                buttonText={skipButtonText}
                buttonClass={classNames(buttonClass, 'close-modal-and-cancel', closeModalButtonClass)}
            />
        </div>
    );
};