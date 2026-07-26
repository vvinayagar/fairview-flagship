import { heroVideo, panoramaImg } from '../data.js'

/* Pinned scroll-scrub panorama. anim.js finds [data-pano], pins the section and
   scrubs the video's currentTime to scroll progress. */
export default function Panorama() {
  return (
    <section className="pano" data-pano>
      <video className="pano__video" muted playsInline preload="auto" poster={panoramaImg}>
        <source src={heroVideo} type="video/mp4" />
      </video>
      <span className="pano__scrim" />
      <div className="pano__inner">
        <span className="pano__eyebrow">Take a look inside</span>
        <h2 className="pano__title">An invitation to <em>explore</em></h2>
        <span className="pano__hint" aria-hidden>Keep scrolling</span>
      </div>
    </section>
  )
}
