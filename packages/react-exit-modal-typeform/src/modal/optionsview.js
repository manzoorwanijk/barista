/**
 * External Dependencies
 */
import React from 'react';
import Button from './button';

export default function ExitModalOptions({
        onClose,
        onDoSurvey,
        introText,
        doSurveyButtonText,
        skipButtonText
    }) {
    const buttonClass = "ee-saas-cancel-prompt-button";
    return (
        <div className={'exit-modal-choices'}>
            <p>{introText}</p>
            <Button
                key={'do survey'}
                handleOnClick={onDoSurvey}
                buttonText={doSurveyButtonText}
                buttonClass={buttonClass + ' do-survey'}
            />
            <Button
                key='close-modal-and-cancel'
                handleOnClick={onClose}
                buttonText={skipButtonText}
                buttonClass={buttonClass + ' close-modal-and-cancel'}
            />
        </div>
    );
};