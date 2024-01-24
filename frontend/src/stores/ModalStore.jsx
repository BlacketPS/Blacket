import { createContext, useContext, useState } from "react";
import { Modal } from "@components";

const ModalStoreContext = createContext();

export function useModal() {
    return useContext(ModalStoreContext);
}

export function ModalStoreProvider({ children }) {
    const [modals, setModals] = useState([]);

    const createModal = (modal) => {
        const id = Math.random().toString(36).slice(2);

        setModals(modals => [...modals, { id, modal }]);

        return id;
    }

    const removeModal = (id) => setModals(modals => modals.filter(modal => modal.id !== id));

    return (
        <ModalStoreContext.Provider value={{ modals, setModals, createModal, removeModal }}>
            {modals[0] && <Modal>{modals[0].modal}</Modal>}

            {children}
        </ModalStoreContext.Provider>
    )
}