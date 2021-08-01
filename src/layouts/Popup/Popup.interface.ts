export interface Props {
  popupTitle: string;
  popupExpose: {
    icon: any;
    title: string;
  };
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}
