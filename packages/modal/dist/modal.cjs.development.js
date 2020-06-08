'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var classNames = _interopDefault(require('classnames'));
var core = require('@chakra-ui/core');

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var Modal = function Modal(_ref) {
  var children = _ref.children,
      closeButton = _ref.closeButton,
      content = _ref.content,
      _ref$destroyOnClose = _ref.destroyOnClose,
      destroyOnClose = _ref$destroyOnClose === void 0 ? true : _ref$destroyOnClose,
      footerContent = _ref.footerContent,
      _ref$isClosable = _ref.isClosable,
      isClosable = _ref$isClosable === void 0 ? true : _ref$isClosable,
      isOpen = _ref.isOpen,
      _ref$scrollBehavior = _ref.scrollBehavior,
      scrollBehavior = _ref$scrollBehavior === void 0 ? "inside" : _ref$scrollBehavior,
      title = _ref.title,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "closeButton", "content", "destroyOnClose", "footerContent", "isClosable", "isOpen", "scrollBehavior", "title"]);

  if (destroyOnClose && !isOpen) {
    return null;
  }

  var className = classNames(props.className, "ee-modal");
  var bodyClassName = classNames(props.bodyClassName, "ee-modal__body");
  return React.createElement(core.Modal, Object.assign({
    closeOnOverlayClick: isClosable,
    isCentered: true,
    isOpen: isOpen,
    scrollBehavior: scrollBehavior
  }, props), React.createElement(core.ModalOverlay, null), React.createElement(core.ModalContent, {
    role: "alertdialog",
    className: className
  }, React.createElement(core.ModalHeader, {
    className: "ee-modal__header"
  }, title), closeButton ? closeButton : React.createElement(core.ModalCloseButton, {
    isDisabled: !isClosable
  }), React.createElement(core.ModalBody, {
    className: bodyClassName
  }, children || content), footerContent && React.createElement(core.ModalFooter, null, footerContent)));
};

// import { __ } from '@wordpress/i18n';
// import { ButtonProps } from '@infraUI/inputs';
// import { Close } from '@appDisplay/icons';
// import "./styles.scss";
// const modalCloseButtonProps: ButtonProps = {
var modalCloseButtonProps = {
  className: "ee-icon-button ee-confirm-close"
};

exports.Modal = Modal;
exports.modalCloseButtonProps = modalCloseButtonProps;
//# sourceMappingURL=modal.cjs.development.js.map
