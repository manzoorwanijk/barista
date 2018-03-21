/**
 * External Dependencies
 */
import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { ExitModalOptions, TypeFormEmbed } from './modal/index';

export const CLOSE_MODAL_EVENT = 'closeModalEvent';

export default class ExitModal extends React.Component {
    constructor () {
        super();
        this.state = {
            showModal: true,
            initialView: true,
        };
    }

    componentWillUpdate(nextProps,nextState) {
        if (nextProps.showModal !== this.state.showModal) {
            this.setState({showModal: nextProps.showModal});
            this.setState({initialView: nextProps.initialView});
        }
    }

    componentDidMount() {
        this.closeModalEvent = new Event(CLOSE_MODAL_EVENT, {modalOpen: this.state.showModal});
    }

    componentWillUnmount() {
        this.closeModalEvent = null;
    }

    handleCloseModal() {
        this.setState({showModal: false});
        //so external scripts listening on the react element can react.
        this.el.dispatchEvent(this.closeModalEvent);
    }

    onDoSurvey() {
        this.setState({initialView:false});
    }

    render() {
        const content = this.state.initialView
            ? <ExitModalOptions
                onClose={() => this.handleCloseModal()}
                onDoSurvey={() => this.onDoSurvey()}
                introText={this.props.introText}
                doSurveyButtonText={this.props.doSurveyButtonText}
                skipButtonText={this.props.skipButtonText}
                />
            : <TypeFormEmbed
                onSubmit={() => this.handleCloseModal()}
                url={this.props.typeFormUrl}
                popup={false}
                typeFormStyle={this.props.styles.typeFormStyle}
            />;
        return (
            <div ref={el => this.el = el}>
                <ReactModal
                    isOpen={this.state.showModal}
                    style={this.props.styles}
                >
                    {content}
                </ReactModal>
            </div>
        )
    }
}


ExitModal.defaultProps = {
    showModal: true,
    showTypeForm: false,
    styles: {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
        },
        content: {
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
        },
        typeFormStyle: {
            width: '600px',
            height: '400px',
        }
    },
    modalClassName: {
        content: '',
        overlay: ''
    },
    typeFormUrl: '',
    introText: "We're sorry to see you go! Will you share feedback through a short survey to help us improve our product?",
    doSurveyButtonText: "Sure I'll help!",
    skipButtonText: "Skip"
};

ExitModal.propTypes = {
    showModal: PropTypes.bool,
    showTypeForm: PropTypes.bool,
    styles: PropTypes.shape({
        overlay: PropTypes.object,
        content: PropTypes.object,
        typeFormStyle: PropTypes.object
    }),
    modalClassName: PropTypes.shape({
        overlay: PropTypes.string,
        content: PropTypes.string,
        typeFormStyle: PropTypes.string
    }),
    typeFormUrl: PropTypes.string.isRequired,
    introText: PropTypes.string,
    skipButtonText: PropTypes.string,
    doSurveyButtonText: PropTypes.string
};
