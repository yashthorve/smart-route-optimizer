import styles from './Table.module.css';

export const Table = ({ children }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>{children}</table>
    </div>
  );
};

export const TableHead = ({ children }) => <thead>{children}</thead>;

export const TableBody = ({ children }) => <tbody>{children}</tbody>;

export const TableRow = ({ children, className = '' }) => (
  <tr className={`${styles.tr} ${className}`}>{children}</tr>
);

export const TableHeader = ({ children, className = '' }) => (
  <th className={`${styles.th} ${className}`}>{children}</th>
);

export const TableCell = ({ children, className = '' }) => (
  <td className={`${styles.td} ${className}`}>{children}</td>
);
