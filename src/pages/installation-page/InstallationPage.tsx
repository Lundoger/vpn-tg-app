import { SwiperSlide, Swiper } from 'swiper/react';
import { EffectFade, Navigation } from 'swiper/modules';
import { steps } from '../../constants/installation';
import StepLayout from './step-layout/StepLayout';
import styles from './InstallationPage.module.scss';
import 'swiper/swiper-bundle.css';

const InstallationPage = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>Установка</h1>
        <Swiper
          modules={[Navigation, EffectFade]}
          spaceBetween={15}
          navigation={{
            nextEl: '.installation-next-el',
            prevEl: '.installation-prev-el',
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
      </div>
    </section>
  );
};

export default InstallationPage;
