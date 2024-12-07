import clsx from 'clsx';
import './CarouselPagination.scss';

interface CarouselPaginationProps {
  className?: string;
}

const CarouselPagination = ({
  className,
  ...props
}: CarouselPaginationProps) => {
  return <div className={clsx('sliderPagination', className)} {...props}></div>;
};

export default CarouselPagination;
