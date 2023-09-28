import Background from "@components/Background";

export default function Error502() {
    document.title = "Maintenance";

    return (
        <>
            <Background color="#4f4f4f" opacity={0.1} />
        </>
    )
}