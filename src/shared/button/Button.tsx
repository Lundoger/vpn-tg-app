import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

const Button = ({ text, className, onClick }: ButtonProps) => {
  return (
    <button type="button" onClick={onClick} className={clsx(styles.button, className)}>
      {text}
    </button>
  );
};

export default Button;
