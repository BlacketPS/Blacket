/**
 * @file The modal store provider wrapper.
 */

import { createContext, useContext, useState } from "react";
import { GenericModal } from "@components/Modals";

// Create a context for the modal store
const ModalStoreContext = createContext();

/**
 * The hook that allows components to interact with the modal store.
 * 
 * @property {Array} modals The modals to display.
 * @property {Function} setModals The function to set the modals.
 * @property {Function} createModal The function to create a modal.
 * @property {Function} closeModal The function to close the modal.
 * 
 * @returns {Object} The modal store context.
 */
export function useModal() {
    return useContext(ModalStoreContext);
}

/**
 * The provider for the modal store.
 * @param {Object} props The properties of the component.
 * @param {Object} props.children The children components.
 * @returns The modal store provider.
 */
export function ModalStoreProvider({ children }) {
    // Get/set the modals to display
    const [modals, setModals] = useState([]);

    // Get/set the closing state
    const [closing, setClosing] = useState(false);

    // Create a modal
    const createModal = (modal) => {
        const id = Math.random().toString(36).slice(2);

        // Add the modal to the modals array
        setModals(modals => [...modals, { id, modal }]);

        return id;
    }

    // Close the current modal
    const closeModal = () => {
        // If the user has disabled modal animations, remove the modal immediately
        if (localStorage.getItem("DISABLE_MODAL_ANIMATION")) return setModals(modals => modals.filter((_, i) => i !== 0));

        setClosing(true);
        setTimeout(() => {
            // Remove the modal from the modals array
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