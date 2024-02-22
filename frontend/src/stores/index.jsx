import { LoadingStoreProvider } from "./LoadingStore";
import { UserStoreProvider } from "./UserStore";
import { SocketStoreProvider } from "./SocketStore";
import { ModalStoreProvider } from "./ModalStore";
import { LeaderboardStoreProvider } from "./LeaderboardStore";

export default function StoreWrapper({ children }) {
    return (
        <LoadingStoreProvider>
            <UserStoreProvider>
                <SocketStoreProvider>
                    <ModalStoreProvider>
                        <LeaderboardStoreProvider>
                            {children}
                        </LeaderboardStoreProvider>
                    </ModalStoreProvider>
                </SocketStoreProvider>
            </UserStoreProvider>
        </LoadingStoreProvider>
    )
}