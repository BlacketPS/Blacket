import { LoadingStoreProvider } from "./LoadingStore";
import { SocketStoreProvider } from "./SocketStore";
import { UserStoreProvider } from "./UserStore";
import { ModalStoreProvider } from "./ModalStore";
import { LeaderboardStoreProvider } from "./LeaderboardStore";

export default function StoreWrapper({ children }) {
    return (
        <LoadingStoreProvider>
            <SocketStoreProvider>
                <UserStoreProvider>
                    <ModalStoreProvider>
                        <LeaderboardStoreProvider>
                            {children}
                        </LeaderboardStoreProvider>
                    </ModalStoreProvider>
                </UserStoreProvider>
            </SocketStoreProvider>
        </LoadingStoreProvider>
    )
}
