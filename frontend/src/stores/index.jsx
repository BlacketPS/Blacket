/**
 * @file The wrapper for all store providers.
 */

import { LoadingStoreProvider } from "./LoadingStore";
import { UserStoreProvider } from "./UserStore";
import { SocketStoreProvider } from "./SocketStore";
import { ModalStoreProvider } from "./ModalStore";
import { ContextMenuStoreProvider } from "./ContextMenuStore";
import { MessageStoreProvider } from "./MessageStore";
import { LeaderboardStoreProvider } from "./LeaderboardStore";

/**
 * The store provider wrapper. Provides the context for all stores, and allows for the use of use hooks in each store.
 * @param {Object} props The properties of the component.
 * @param {Object} props.children The children components.
 * @returns 
 */
export default function StoreWrapper({ children }) {
    return (
        <LoadingStoreProvider>
            <UserStoreProvider>
                <SocketStoreProvider>
                    <ModalStoreProvider>
                        <ContextMenuStoreProvider>
                            <MessageStoreProvider>
                                <LeaderboardStoreProvider>
                                    {children}
                                </LeaderboardStoreProvider>
                            </MessageStoreProvider>
                        </ContextMenuStoreProvider>
                    </ModalStoreProvider>
                </SocketStoreProvider>
            </UserStoreProvider>
        </LoadingStoreProvider>
    )
}