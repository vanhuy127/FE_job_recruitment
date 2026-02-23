import { useModal } from '@/hooks/useModel';

const ModalRoot = () => {
  const { isOpen, ModalComponent } = useModal();

  if (!isOpen || !ModalComponent) return null;

  return <ModalComponent />;
};

export default ModalRoot;
