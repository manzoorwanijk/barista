import React from 'react';
import classNames from 'classnames';
import { Modal as Modal$1, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/core';

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
  return React.createElement(Modal$1, Object.assign({
    closeOnOverlayClick: isClosable,
    isCentered: true,
    isOpen: isOpen,
    scrollBehavior: scrollBehavior
  }, props), React.createElement(ModalOverlay, null), React.createElement(ModalContent, {
    role: "alertdialog",
    className: className
  }, React.createElement(ModalHeader, {
    className: "ee-modal__header"
  }, title), closeButton ? closeButton : React.createElement(ModalCloseButton, {
    isDisabled: !isClosable
  }), React.createElement(ModalBody, {
    className: bodyClassName
  }, children || content), footerContent && React.createElement(ModalFooter, null, footerContent)));
};

// import { __ } from '@wordpress/i18n';
// import { ButtonProps } from '@infraUI/inputs';
// import { Close } from '@appDisplay/icons';
// import "./styles.scss";
// const modalCloseButtonProps: ButtonProps = {
var modalCloseButtonProps = {
  className: "ee-icon-button ee-confirm-close"
};

export { Modal, modalCloseButtonProps };
//# sourceMappingURL=modal.esm.js.map
