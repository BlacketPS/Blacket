import Background from "@components/Background";
import Modal from "@components/Modal";
import Loader from "@components/Loader";

export default function Loading({ message }) {
    return (
        <>
            <Background />

            <Modal>
                <Loader image="/content/blooks/Console.gif" message={`Loading ${message}...`} />
            </Modal>
        </>
    )
}