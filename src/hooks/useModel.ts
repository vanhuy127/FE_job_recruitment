import { useMemo } from 'react';

import { MODAL_TYPE } from '@/constants';
import { useModalStore } from '@/store';

const MODAL_COMPONENTS: Record<MODAL_TYPE, React.ComponentType | null> = {
  //example:
  // [MODAL_TYPE.CREATE_FOLDER]: CreateFolderModal,
};

export const useModal = () => {
  const { isOpen, type, data, openModal, closeModal } = useModalStore();

  const ModalComponent = useMemo(() => {
    if (!type) return null;

    return MODAL_COMPONENTS[type] ?? null;
  }, [type]);

  return {
    isOpen,
    type,
    data,
    openModal,
    closeModal,
    ModalComponent,
  };
};
