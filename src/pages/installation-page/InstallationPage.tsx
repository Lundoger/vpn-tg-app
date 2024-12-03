import { SwiperSlide, Swiper } from 'swiper/react';
import { EffectFade, Navigation } from 'swiper/modules';
import styles from './InstallationPage.module.scss';
import StepLayout from './step-layout/StepLayout';
import 'swiper/css';
import 'swiper/css/effect-fade';

const InstallationPage = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>Установка</h1>
        <Swiper
          modules={[Navigation, EffectFade]}
          spaceBetween={15}
          navigation={{
            nextEl: '',
            prevEl: '',
          }}
        >
          {/* этап 1 */}
          <SwiperSlide className={styles.slide}>
            <StepLayout title="Этап - 1">
              <div className=""></div>
            </StepLayout>
          </SwiperSlide>
          {/* этап 2 */}
          <SwiperSlide className={styles.slide}>
            <StepLayout title="Этап - 2">
              <div className=""></div>
            </StepLayout>
          </SwiperSlide>
          {/* этап 3 */}
          <SwiperSlide className={styles.slide}>
            <StepLayout title="Этап - 3">
              <div className=""></div>
            </StepLayout>
          </SwiperSlide>
          {/* этап 4 */}
          <SwiperSlide className={styles.slide}>
            <StepLayout title="Этап - 4">
              <div className=""></div>
            </StepLayout>
          </SwiperSlide>
          {/* этап 5 */}
          <SwiperSlide className={styles.slide}>
            <StepLayout title="Этап - 5">
              <div className=""></div>
            </StepLayout>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default InstallationPage;
