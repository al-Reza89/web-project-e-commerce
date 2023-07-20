import { create } from "zustand";

interface BankAccountModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useBankAccountModal = create<BankAccountModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useBankAccountModal;
