import styles from "@styles";

const name = import.meta.env.VITE_INFORMATION_NAME;

export default function Copyright() {
    return (
        <div className={styles.home.copyrightInformation}>
            We are not affiliated with Blooket in any way.
            <br />
            Please do not contact Blooket about any issues you may have with {name}.
            <br />
            {name} © {new Date().getFullYear()} All Rights Reserved.
        </div>
    )
}