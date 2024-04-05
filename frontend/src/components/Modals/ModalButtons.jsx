import { ModalLoader } from "@components/Modals";
import styles from "@styles";

/**
 * The modal buttons component.
 * @param {Object} props The properties for this component.
 * @param {boolean} props.loading If the buttons are loading.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The modal buttons component.
 */
export default function ModalButtons({ loading, children }) {
    return <div className={styles.modal.buttons} data-loading={loading}>{loading ? <ModalLoader /> : children}</div>;
}