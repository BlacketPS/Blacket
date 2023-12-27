import { LoadingStoreProvider } from "@stores/LoadingStore";

export default function Stores({ children }) {
    return (
        <LoadingStoreProvider>
            {children}
        </LoadingStoreProvider>
    )
}