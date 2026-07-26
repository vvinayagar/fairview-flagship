import { useState } from 'react'
import { campuses } from '../data.js'

export default function Enquire() {
  const [sent, setSent] = useState(false)
  return (
    <section className="enquire section-pad" id="enquire">
      <div className="wrap">
        <div className="enquire__grid row g-5 align-items-center">
          <div className="col-12 col-lg-5" data-reveal>
            <span className="enquire__eyebrow">Admissions open · 2026 &amp; 2027 intake</span>
            <h2 className="display display--light">Start your child’s <em>Fairview story</em></h2>
            <p className="enquire__lede">Tell us a little about your family and we’ll help you find
              the campus and programme that fit best — and arrange a visit.</p>
            <p className="enquire__contact">
              <a href="tel:+60341420888">+603-4142 0888</a><br />
              <a href="mailto:enquiries@fairview.edu.my">enquiries@fairview.edu.my</a>
            </p>
          </div>
          <div className="col-12 col-lg-7" data-reveal>
            {sent ? (
              <div className="enquire__done" role="status">
                <strong>Thank you — your enquiry is on its way.</strong>
                <p>A member of our admissions team will be in touch within one working day.</p>
              </div>
            ) : (
              <form className="enquire__form" onSubmit={e => { e.preventDefault(); setSent(true) }}>
                <div className="row g-3">
                  <div className="col-12 col-md-6"><label>First name<input required /></label></div>
                  <div className="col-12 col-md-6"><label>Last name<input required /></label></div>
                  <div className="col-12 col-md-6"><label>Email<input type="email" required /></label></div>
                  <div className="col-12 col-md-6"><label>Phone<input required /></label></div>
                  <div className="col-12 col-md-6"><label>Preferred campus
                    <select defaultValue=""><option value="" disabled>Please select</option>
                      {campuses.map(c => <option key={c.name}>{c.name}</option>)}</select></label></div>
                  <div className="col-12 col-md-6"><label>Entry year
                    <select defaultValue=""><option value="" disabled>Please select</option>
                      <option>2026</option><option>2027</option></select></label></div>
                  <div className="col-12"><label>Message<textarea rows="3" /></label></div>
                  <div className="col-12"><button className="btn btn--gold" type="submit" data-magnetic>Submit enquiry</button></div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
