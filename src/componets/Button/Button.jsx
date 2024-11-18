import cn from 'classnames';
import styles from './Button.module.css';

export const Button = ({ active, className, ...props }) => (
    <button {...props} className={cn(className, active && styles.buttonActive, styles.button)} />
);
