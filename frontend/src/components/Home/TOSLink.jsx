import { Link } from "react-router-dom";
import styles from "@styles";

export default function TOSLink() {
    return <Link to="/terms" className={styles.home.termsOfServiceLink}>Terms of Service</Link>;
}