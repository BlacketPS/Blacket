import styles from "@styles";

export default function AgreeHolder({ checked, ...props }) {
    return (
        <div className={styles.authentication.agreeHolder}>
            <div className={`${styles.authentication.checkBox} ${checked ? styles.authentication.checkYes : styles.authentication.checkNo}`} {...props}>
                <i className={`fas fa-check ${styles.authentication.checkIcon}`} />
            </div>

            <div className={styles.authentication.agreeText}>
                I agree to the <a className={styles.authentication.link} href="/terms" target="_blank">Terms of Service</a> and <a className={styles.authentication.link} href="/privacy" target="_blank">Privacy Policy</a>.
            </div>
        </div>
    )
}