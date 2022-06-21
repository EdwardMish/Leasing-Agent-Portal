import React from "react";

const styles = require("./form-row.module.css");

interface TwoColumnFormRowProps {
    withMargin?: boolean;
}

export const TwoColumnFormRow: React.FC<TwoColumnFormRowProps> = ({ withMargin = true, children }) => (
    <div className={styles.TwoColumnFormRow} style={{ margin: withMargin ? "0 0 1rem" : "0" }}>
        {children}
    </div>
);
