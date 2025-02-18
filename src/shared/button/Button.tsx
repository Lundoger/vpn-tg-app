import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ text, className, onClick, disabled }: ButtonProps) => {
  return (
    <button 
      className={clsx(styles.button, className)} 
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
