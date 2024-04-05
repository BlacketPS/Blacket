/**
 * @file The context menu store provider and hook.
 */

import { createContext, useContext, useState, useRef, useEffect } from "react";
import { Container, Divider, Item } from "@components/ContextMenu";

const ContextMenuContext = createContext();

/**
 * The context menu hook.
 * @returns {Object} The context menu.
 */
export function useContextMenu() {
    return useContext(ContextMenuContext);
}

/**
 * The context menu store provider.
 * @param {Object} props The properties to pass to the component.
 * @param {JSX.Element} props.children The children components.
 * @returns {JSX.Element} The context menu store provider.
 */
export function ContextMenuStoreProvider({ children }) {
    // Where is the cursor located? Initially, it is at the top-left corner.
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    // What is the context menu?
    const [contextMenu, setContextMenu] = useState(null);

    // Reference to the context menu.
    const contextMenuRef = useRef(null);

    // Open the context menu with the specified items.
    const openContextMenu = (items) => {
        // If the window is less than or equal to 768 pixels wide (likely a mobile device), then set the context menu to the items WITHOUT a specified position.
        if (window.innerWidth <= 768) return setContextMenu({ items });
        else setContextMenu({ items, x: cursorPosition.x, y: cursorPosition.y });

        // need a setTimeout here else it will not set the context menu position correctly do not remove
        setTimeout(() => {
            // Get the context menu's bounding rectangle.
            const contextMenuRect = contextMenuRef.current.getBoundingClientRect();

            // If the context menu is too far to the right or bottom, then adjust the context menu's position.
            if (contextMenuRect.right > window.innerWidth) setContextMenu({ items, x: cursorPosition.x - contextMenuRect.width, y: cursorPosition.y });
            if (contextMenuRect.bottom > window.innerHeight) setContextMenu({ items, x: cursorPosition.x, y: cursorPosition.y - contextMenuRect.height });
        });
    }

    // Close the context menu.
    const closeContextMenu = () => setContextMenu(null);

    useEffect(() => {
        // When the mouse moves, update the cursor position.
        window.addEventListener("mousemove", e => setCursorPosition({ x: e.clientX, y: e.clientY }));

        // When the mouse is clicked, close the context menu if the click is outside the context menu.
        const handleClickOutside = (e) => (contextMenuRef.current && contextMenuRef.current.contains(e.target) || closeContextMenu());

        // Register the event listener.
        window.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listeners.
        return () => {
            window.removeEventListener("mousemove", e => setCursorPosition({ x: e.clientX, y: e.clientY }));

            window.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    return (
        <ContextMenuContext.Provider value={{ contextMenu, setContextMenu, openContextMenu, closeContextMenu }}>
            {contextMenu && <Container ref={contextMenuRef} top={contextMenu.y} left={contextMenu.x}>
                {contextMenu.items.map((item, index) => item.divider ? <Divider key={index} /> : item && <Item key={index} icon={item.icon} color={item.color} onClick={() => {
                    item.onClick();

                    closeContextMenu();
                }}>{item.label}</Item>)}
            </Container>}

            {children}
        </ContextMenuContext.Provider>
    )
}