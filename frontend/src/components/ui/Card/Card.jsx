import styles from './Card.module.css';

export const Card = ({ children, className = '' }) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};

export const CardHeader = ({ title, children, className = '' }) => {
  return (
    <div className={`${styles.header} ${className}`}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {children}
    </div>
  );
};

export const CardBody = ({ children, className = '' }) => {
  return <div className={`${styles.body} ${className}`}>{children}</div>;
};
