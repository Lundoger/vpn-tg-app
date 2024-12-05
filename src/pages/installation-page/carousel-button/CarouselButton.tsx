import clsx from 'clsx';
import arrow from '../../../assets/installation/arrow.svg';
import styles from './CarouselButton.module.scss';

interface CarouselButtonProps {
  className?: string;
}

const CarouselButton = ({ className, ...props }: CarouselButtonProps) => {
  return (
    <button className={clsx(styles.button, className)} {...props}>
      <img src={arrow} alt="arrow" />
    </button>
  );
};

export default CarouselButton;
