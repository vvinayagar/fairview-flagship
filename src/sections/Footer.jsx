import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'
import { footerQuick, footerSchools, accreditations, socials } from '../data.js'

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="row foot__grid g-5">
          <div className="col-12 col-lg-4 foot__brand">
            <img src="/fairview-logo-white.png" alt="Fairview International School" className="foot__logo" />
            <p>A top global IB World School, welcoming students aged 3 to 19 across our network of
              private international campuses in Malaysia — a beacon of quality education since 1978.</p>
            <div className="foot__social">
              {socials.map((s, i) => <a key={i} href="#" aria-label="Social link">{s}</a>)}
            </div>
          </div>
          <div className="col-6 col-lg-2 foot__col">
            <h3>Our campuses</h3>
            <ul>{footerSchools.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
          </div>
          <div className="col-6 col-lg-2 foot__col">
            <h3>Quick links</h3>
            <ul>{footerQuick.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
          </div>
          <div className="col-12 col-lg-4 foot__col foot__contact">
            <h3>Get in touch</h3>
            <p className="foot__addr">Fairview International School<br />Lot 4178, Jalan 1/27<br />
              Seksyen 1 Wangsa Maju<br />53300 Kuala Lumpur, Malaysia</p>
            <p className="foot__addr"><a href="tel:+60341420888">+603-4142 0888</a><br />
              <a href="mailto:enquiries@fairview.edu.my">enquiries@fairview.edu.my</a></p>
            <a href="#enquire" className="btn btn--gold" data-magnetic>Enquire now</a>
          </div>
        </div>

        <div className="foot__accred">
          <span className="foot__accred-label">Awards &amp; accreditations</span>
          <Swiper className="marquee" modules={[Autoplay, FreeMode]} slidesPerView="auto"
            spaceBetween={16} loop freeMode allowTouchMove={false}
            autoplay={{ delay: 0, disableOnInteraction: false }} speed={5000}>
            {accreditations.concat(accreditations).map((a, i) => (
              <SwiperSlide key={i} className="marquee__slide"><span className="chip chip--lg">{a}</span></SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="foot__bar">
          <span>© {new Date().getFullYear()} Fairview International School · Privacy Policy · Cookies</span>
          <span>A Top Global IB World School in Malaysia</span>
        </div>
      </div>
    </footer>
  )
}
