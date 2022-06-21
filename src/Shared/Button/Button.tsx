import * as React from "react";

const styles = require("../Styles/button.module.css");

export interface ButtonProps {
    text: string;
    callback?: () => void;
    reset?: boolean;
    fullWidth?: boolean;
    disable?: boolean;
    lowProfile?: boolean;
    inverse?: boolean;
    reverse?: boolean;
    warning?: boolean;
    withMarginTop?: boolean;
    withMarginBottom?: boolean;
    style?: React.CSSProperties;
    type?: "submit" | "reset" | "button";
}

export const Button: React.FC<ButtonProps> = ({
    text,
    callback = () => {},
    reset = false,
    fullWidth = false,
    disable = false,
    lowProfile = false,
    inverse = false,
    reverse = false,
    warning = false,
    withMarginTop = false,
    withMarginBottom = false,
    style = {},
    type = "button",
}) => {
    const [disabled, toggleDisable] = React.useState<boolean>(disable);

    const handleClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        if (!disabled) {
            if (type === "button") {
                e.preventDefault();
            }

            callback();
        }
    };

    React.useEffect(() => {
        reset ? toggleDisable(true) : toggleDisable(false);
    }, [reset]);

    React.useEffect(() => {
        toggleDisable(disable);
    }, [disable]);

    const buttonStyles = (): string => {
        let buttonStyle = [styles.Button];

        if (inverse) buttonStyle.push(styles.InverseButton);
        if (warning) buttonStyle.push(styles.WarningButton);
        if (reverse) buttonStyle.push(styles.ReverseButton);

        return buttonStyle.join(" ");
    };

    return (
        <button
            className={buttonStyles()}
            style={{
                marginBottom: withMarginBottom ? "0.75rem" : "0",
                marginTop: withMarginTop ? "0.75rem" : "0",
                padding: lowProfile ? "0.5rem 1.5rem" : "0.75rem 1.5rem",
                width: fullWidth ? "100%" : "auto",
                ...style,
            }}
            onClick={handleClick}
            disabled={disabled}
            type={type}
        >
            <span>{text}</span>
        </button>
    );
};
