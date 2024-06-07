import React, { createContext, useContext, useState } from 'react';
import ModalContainer from './ModalContainer';

const ModalContext = createContext();

const useModalState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);

  const openModal = (newContent) => {
    setIsOpen(true);
    setContent(newContent);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
  };

  return {
    isOpen,
    content,
    openModal,
    closeModal,
  };
};

export const ModalProvider = ({ children }) => {
  const modalState = useModalState();

  return (
    <ModalContext.Provider value={modalState}>
      {children}
      {modalState.isOpen && <ModalContainer />}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
