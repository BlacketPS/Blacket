import styles from "@styles";

export default function Body({ children }) {
    return (
        <div className={styles.all.regularBody}>
            <form className={styles.authentication.container}>
                {children}
            </form>
        </div>
    )
}