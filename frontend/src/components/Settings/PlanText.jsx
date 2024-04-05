import styles from "@styles";

/**
 * The plan text component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The plan text component.
 */
export default function PlanText({ children }) {
    return (
        <div className={styles.settings.planText}>
            <div>{import.meta.env.VITE_INFORMATION_NAME}</div>
            <div>{children}</div>
        </div>
    )
}