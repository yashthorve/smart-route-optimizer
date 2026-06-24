import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(({ label, id, className = '', ...props }, ref) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <input
        id={id}
        ref={ref}
        className={styles.input}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
