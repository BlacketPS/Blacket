import styles from "@styles";

export default function PlanText({ children }) {
    return (
        <div className={styles.settings.planText}>
            <div>{import.meta.env.VITE_INFORMATION_NAME}</div>
            <div>{children}</div>
        </div>
    )
}