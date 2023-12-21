import { useEffect, useState } from "react";
import Background from "@components/Background";
import Sidebar from "@components/Sidebar";
import Modal from "@components/Modal";
import styles from "@styles";

export default function Dashboard() {
    document.title = `Dashboard | ${import.meta.env.VITE_INFORMATION_NAME}`;

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        throw new Error("This is an error");
    }, []);

    return (
        <>
            <Background />

            <Sidebar />

            <button onClick={() => setModalOpen(true)} style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }}>
                Open modal
            </button>

            {modalOpen && <Modal>
                <div className={styles.authentication.container}>
                    <h1 className={styles.authentication.containerHeader}>Dashboard</h1>
                    <div style={{
                        color: "var(--accent-color)",
                        fontSize: "30px"
                    }}>
                        Kit
                        <div className={styles.authentication.button} onClick={() => {
                            setModalOpen(false);
                        }}>
                            Okay
                        </div>
                    </div>
                </div>
            </Modal >}
        </>
    )
}