import { LoadingStoreProvider } from "./LoadingStore";
import { UserStoreProvider } from "./UserStore";
import { SocketStoreProvider } from "./SocketStore";
import { ModalStoreProvider } from "./ModalStore";
import { MessageStoreProvider } from "./MessageStore";
import { LeaderboardStoreProvider } from "./LeaderboardStore";

export default function StoreWrapper({ children }) {
    return (
        <LoadingStoreProvider>
            <UserStoreProvider>
                <SocketStoreProvider>
                    <ModalStoreProvider>
                        <MessageStoreProvider>
                            <LeaderboardStoreProvider>
                                {children}
                            </LeaderboardStoreProvider>
                        </MessageStoreProvider>
                    </ModalStoreProvider>
                </SocketStoreProvider>
            </UserStoreProvider>
        </LoadingStoreProvider>
    )
}