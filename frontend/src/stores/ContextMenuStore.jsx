import { createContext, useContext, useState, useRef, useEffect } from "react";
import { Container, Divider, Item } from "@components/ContextMenu";

const ContextMenuContext = createContext();

export function useContextMenu() {
    return useContext(ContextMenuContext);
}

export function ContextMenuStoreProvider({ children }) {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [contextMenu, setContextMenu] = useState(null);

    const contextMenuRef = useRef(null);

    const openContextMenu = (items) => {
        setContextMenu({ items, x: cursorPosition.x, y: cursorPosition.y });

        setTimeout(() => {
            const contextMenuRect = contextMenuRef.current.getBoundingClientRect();

            if (contextMenuRect.right > window.innerWidth) setContextMenu({ items, x: cursorPosition.x - contextMenuRect.width, y: cursorPosition.y });
            if (contextMenuRect.bottom > window.innerHeight) setContextMenu({ items, x: cursorPosition.x, y: cursorPosition.y - contextMenuRect.height });
        });
    }

    const closeContextMenu = () => setContextMenu(null);

    useEffect(() => {
        window.addEventListener("mousemove", e => setCursorPosition({ x: e.clientX, y: e.clientY }));

        const handleClickOutside = (e) => (contextMenuRef.current && contextMenuRef.current.contains(e.target) || closeContextMenu());

        window.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("mousemove", e => setCursorPosition({ x: e.clientX, y: e.clientY }));

            window.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    return (
        <ContextMenuContext.Provider value={{ contextMenu, setContextMenu, openContextMenu, closeContextMenu }}>
            {contextMenu && <Container ref={contextMenuRef} top={contextMenu.y} left={contextMenu.x}>
                {contextMenu.items.map((item, index) => item.divider ? <Divider /> : item && <Item key={index} icon={item.icon} color={item.color} onClick={() => {
                    item.onClick();

                    closeContextMenu();
                }}>{item.label}</Item>)}
            </Container>}

            {children}
        </ContextMenuContext.Provider>
    )
}