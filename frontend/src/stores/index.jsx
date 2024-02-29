import { LoadingStoreProvider } from "./LoadingStore";
import { UserStoreProvider } from "./UserStore";
import { SocketStoreProvider } from "./SocketStore";
import { ModalStoreProvider } from "./ModalStore";
import { ContextMenuStoreProvider } from "./ContextMenuStore";
import { MessageStoreProvider } from "./MessageStore";
import { LeaderboardStoreProvider } from "./LeaderboardStore";

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