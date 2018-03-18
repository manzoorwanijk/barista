/**
 * External Dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as tfEmbed from '@typeform/embed';

export default class TypeFormEmbed extends Component {
    componentDidMount() {
        const {
            url,
            hideHeaders,
            hideFooter,
            opacity,
            buttonText,
            popup,
            mode,
            autoOpen,
            autoClose,
            onSubmit
        } = this.props;
        const options = {
            hideHeaders,
            hideFooter,
            opacity,
            buttonText,
            mode,
            autoOpen,
            autoClose,
            onSubmit
        };
        if ( popup ) {
            this.typeform = tfEmbed.makePopup(url, options);
        } else {
            const el = this.typeformEl;
            tfEmbed.makeWidget(el, url, options);
        }
    }

    render() {
        return (
            <div className="react-typeform-embed" ref={tf => this.typeformEl = tf} style={this.props.style} />
        )
    }
}


TypeFormEmbed.propTypes = {
    style: PropTypes.object,
    url: PropTypes.string.isRequired,
    popup: PropTypes.bool,
    hideHeaders: PropTypes.bool,
    hideFooter: PropTypes.bool,

    // Widget options
    opacity: PropTypes.number,
    buttonText: PropTypes.string,

    // Popup options
    mode: PropTypes.oneOf(['popup', 'drawer_left', 'drawer_right']),
    autoOpen: PropTypes.bool,
    autoClose: PropTypes.number,
    onSubmit: PropTypes.func
};

TypeFormEmbed.defaultProps = {
    style: {},
    url: '',
    popup:false,
    hideHeaders: false,
    hideFooter: false,
    opacity: 100,
    buttonText: 'Start',
    mode: "popup",
    autoOpen:false
};