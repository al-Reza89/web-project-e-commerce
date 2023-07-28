import { create } from "zustand";

interface ApplyMoneyModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useApplyMoneyModal = create<ApplyMoneyModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useApplyMoneyModal;
