import React from "react";
import { Modal } from "@chakra-ui/core";
export interface ModalProps extends React.ComponentProps<typeof Modal> {
    bodyClassName?: string;
    className?: string;
    closeButton?: React.ReactNode;
    content?: React.ReactNode;
    destroyOnClose?: boolean;
    footerContent?: React.ReactNode;
    isClosable?: boolean;
    title?: React.ReactNode;
}
