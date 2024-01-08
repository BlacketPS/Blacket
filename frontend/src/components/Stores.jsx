import { LoadingStoreProvider } from "@stores/LoadingStore";
import { UserStoreProvider } from "@stores/UserStore";

export default function Stores({ children }) {
    return (
        <LoadingStoreProvider>
            <UserStoreProvider>
                {children}
            </UserStoreProvider>
        </LoadingStoreProvider>
    )
}