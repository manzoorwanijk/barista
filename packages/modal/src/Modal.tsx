import React from "react";
import classNames from "classnames";
import {
  Button,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/core";

// import { Button } from "@application/ui/input";
import { ModalProps } from "./types";

const Modal: React.FC<ModalProps> = ({
  children,
  closeButton,
  content,
  destroyOnClose = true,
  footerContent,
  isClosable = true,
  isOpen,
  scrollBehavior = "inside",
  title,
  ...props
}) => {
  if (destroyOnClose && !isOpen) {
    return null;
  }

  const className = classNames(props.className, "ee-modal");
  const bodyClassName = classNames(props.bodyClassName, "ee-modal__body");

  return (
    <ChakraModal
      closeOnOverlayClick={isClosable}
      isCentered
      isOpen={isOpen}
      scrollBehavior={scrollBehavior}
      {...props}
    >
      <ModalOverlay />
      <ModalContent role="alertdialog" className={className}>
        <ModalHeader className="ee-modal__header">{title}</ModalHeader>

        {closeButton ? (
          closeButton
        ) : (
          <ModalCloseButton isDisabled={!isClosable} />
        )}

        <ModalBody className={bodyClassName}>{children || content}</ModalBody>

        {footerContent && <ModalFooter>{footerContent}</ModalFooter>}
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
