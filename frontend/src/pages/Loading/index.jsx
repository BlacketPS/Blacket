import Background from "@components/Background";
import Modal from "@components/Modal";
import Loader from "@components/Loader";

export default function Loading({ message }) {
    return (
        <>
            <Background color="#4f4f4f" opacity={0.1} />

            <Modal>
                <Loader message={`Loading ${message}...`}/>
            </Modal>
        </>
    )
}