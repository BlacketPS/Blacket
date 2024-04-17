import { createContext, useContext, useState } from "react";
import { GenericModal } from "@components/Modals";

const ModalStoreContext = createContext();

export function useModal() {
    return useContext(ModalStoreContext);
}

export function ModalStoreProvider({ children }) {
    const [modals, setModals] = useState([]);
    const [closing, setClosing] = useState(false);

    const createModal = (modal) => {
        const id = Math.random().toString(36).slice(2);

        setModals(modals => [...modals, { id, modal }]);

        return id;
    }

    const closeModal = () => {
        if (localStorage.getItem("DISABLE_MODAL_ANIMATION")) return setModals(modals => modals.filter((_, i) => i !== 0));

        setClosing(true);
        setTimeout(() => {
            setModals(modals => modals.filter((_, i) => i !== 0));
            setClosing(false);
        }, 525);
    }

    return (
        <ModalStoreContext.Provider value={{ modals, setModals, createModal, closeModal }}>
            {modals[0] && <GenericModal closing={closing} noAnimation={localStorage.getItem("DISABLE_MODAL_ANIMATION")}>{modals[0].modal}</GenericModal>}

            {children}
        </ModalStoreContext.Provider>
    )
}