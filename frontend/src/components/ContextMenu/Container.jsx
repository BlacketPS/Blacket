import { forwardRef } from "react";
import styles from "@styles";

const Container = forwardRef(({ top, left, children }, ref) => <div ref={ref} className={styles.contextMenu.container} style={{ top, left }} onContextMenu={e => e.preventDefault()}>{children}</div>);

export default Container;