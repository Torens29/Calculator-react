import cn from "classnames";
import styles from "./Button.module.css" 

export const Button = ({ className, ...props }) => (
    <button
        {...props}
        className={cn(className, styles.button)}
    />
);
