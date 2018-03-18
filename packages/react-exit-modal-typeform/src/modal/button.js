/**
 * External Dependencies
 */
import React from 'react';

export default function Button({handleOnClick, buttonText, buttonClass}) {
    return (
        <button className={buttonClass} onClick={handleOnClick}>{buttonText}</button>
    );
}