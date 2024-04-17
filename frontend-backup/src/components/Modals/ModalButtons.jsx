import { ModalLoader } from "@components/Modals";
import styles from "@styles";

export default function ModalButtons({ loading, children }) {
    return <div className={styles.modal.buttons} data-loading={loading}>{loading ? <ModalLoader /> : children}</div>;
}