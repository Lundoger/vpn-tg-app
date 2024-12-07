import { SwiperSlide, Swiper } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { steps } from '../../constants/installation';
import StepLayout from './step-layout/StepLayout';
import styles from './InstallationPage.module.scss';
import 'swiper/swiper-bundle.css';
import CarouselPagination from './carousel-pagination/CarouselPagination';

const InstallationPage = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>Установка</h1>
        <Swiper
          className={styles.slider}
          modules={[Navigation, EffectFade, Pagination]}
          spaceBetween={15}
          navigation={{
            nextEl: '.installation-next-el',
            prevEl: '.installation-prev-el',
          }}
          pagination={{
            el: '.installation-pagination-el',
            clickable: true,
          }}
        >
          {steps.map(({ title, content }) => (
            <SwiperSlide key={title} className={styles.slide}>
              <StepLayout title={title}>
                <div className={styles.stepContent}>{content}</div>
              </StepLayout>
            </SwiperSlide>
          ))}
        </Swiper>

        <CarouselPagination className="installation-pagination-el" />
      </div>
    </section>
  );
};

export default InstallationPage;
