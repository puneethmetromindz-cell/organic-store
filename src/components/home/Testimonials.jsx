import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Star } from 'lucide-react';
import { mockTestimonials } from '../../data/mockData';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  return (
    <section className="section" id="testimonials" style={{ backgroundColor: 'var(--color-gray-50)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-header__decorative">Community Love</span>
          <h2 className="section-header__title">What Our Family Says</h2>
          <div className="section-header__divider"></div>
          <p className="section-header__subtitle" style={{ marginTop: '16px' }}>
            Hear from our community members about their experiences with our Ayurvedic remedies.
          </p>
        </div>

        <div style={{ marginTop: '20px', paddingBottom: '40px' }}>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            style={{ padding: '10px 10px 40px 10px' }}
          >
            {mockTestimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="testimonial-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    {/* Stars */}
                    <div className="testimonial-card__stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < testimonial.rating ? '#EAB308' : 'none'}
                          color="#EAB308"
                        />
                      ))}
                    </div>

                    {/* Feedback Text */}
                    <p className="testimonial-card__text">
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* Author Meta */}
                  <div className="testimonial-card__author" style={{ marginTop: '20px' }}>
                    <div className="testimonial-card__avatar">
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="testimonial-card__name">{testimonial.name}</div>
                      <div className="testimonial-card__location">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
