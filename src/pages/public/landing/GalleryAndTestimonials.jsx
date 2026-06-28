import { useState, useRef } from 'react';
import { HiOutlineStar } from 'react-icons/hi';
import { FiPlay, FiX, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

// High-quality mixed media list (5 images, 5 local videos)
const mediaItems = [
  {
    type: 'video',
    src: '/nbnstic.nss_14050405_211733696.mp4',
    thumbnail: '/nbnstic.nss_14050405_215848557.jpg',
    label: 'NSS Environment Conservation',
    category: 'Environment',
  },
  {
    type: 'image',
    src: '/IMG-20260626-WA0018.jpg',
    label: 'NSS Volunteer Orientation',
    category: 'Community',
  },
  {
    type: 'video',
    src: '/nbnstic.nss_14050405_211817548.mp4',
    thumbnail: '/nbnstic.nss_14050405_215901829.jpg',
    label: 'Social Awareness Campaign',
    category: 'Leadership',
  },
  {
    type: 'image',
    src: '/IMG-20260626-WA0020.jpg',
    label: 'Swachhta Abhiyan Sanitation',
    category: 'Cleanliness',
  },
  {
    type: 'video',
    src: '/lcs4society_14050405_215651553.mp4',
    thumbnail: '/nbnstic.nss_14050405_215905583.jpg',
    label: 'Rural Education Camp',
    category: 'Education',
  },
  {
    type: 'image',
    src: '/IMG-20260626-WA0023.jpg',
    label: 'Special Youth Camp',
    category: 'Service',
  },
  {
    type: 'video',
    src: '/nbnstic.nss_14050405_203132978.mp4',
    thumbnail: '/nbnstic.nss_14050405_215917271.jpg',
    label: 'Community Empowerment Camp',
    category: 'Welfare',
  },
  {
    type: 'image',
    src: '/nbnstic.nss_14050405_215852537.jpg',
    label: 'Blood Donation Drive',
    category: 'Healthcare',
  },
  {
    type: 'video',
    src: '/nbnstic.nss_14050405_215643087.mp4',
    thumbnail: '/nbnstic.nss_14050405_215921090.jpg',
    label: 'Annual NSS Youth Meet',
    category: 'Unity',
  },
  {
    type: 'image',
    src: '/nbnstic.nss_14050405_215949817.jpg',
    label: 'Clean and Green City Drive',
    category: 'Environment',
  }
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'NSS Volunteer, 2nd Year',
    quote: 'NSS transformed my outlook on life. The community service activities taught me empathy and leadership beyond textbooks.',
    avatar: 'PS',
    color: 'bg-[#102167]',
  },
  {
    name: 'Rahul Patil',
    role: 'NSS Unit Secretary',
    quote: 'Being an NSS secretary helped me develop organisational skills. The motto "Not Me But You" is something I live by every day.',
    avatar: 'RP',
    color: 'bg-[#ef7041]',
  },
  {
    name: 'Ananya Kulkarni',
    role: 'NSS Volunteer, 3rd Year',
    quote: 'The blood donation camp we organised saved real lives. NSS gives you a purpose beyond your own ambitions.',
    avatar: 'AK',
    color: 'bg-emerald-600',
  },
];

const GalleryAndTestimonials = () => {
  const [activeMedia, setActiveMedia] = useState(null);
  const [modalMuted, setModalMuted] = useState(false);
  const videoRefs = useRef([]);
  const [testimonialsRef, testimonialsVisible] = useScrollReveal();

  const openLightbox = (item) => {
    setActiveMedia(item);
    setModalMuted(false); // Default to unmuted when opening lightbox
  };

  const closeLightbox = () => {
    setActiveMedia(null);
  };

  return (
    <>
      {/* CSS styling for Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-sync {
          display: flex;
          width: max-content;
          animation: marquee 45s linear infinite;
        }
        /* Pause scroll on hover */
        .marquee-container:hover .animate-marquee-sync {
          animation-play-state: paused;
        }
      `}</style>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="text-center">
            <span className="text-xs font-bold text-[#ef7041] uppercase tracking-widest">Moments</span>
            <h2 className="text-4xl font-extrabold text-[#102167] mt-2">
              Our <span className="text-[#ef7041]">Gallery</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#102167] to-[#ef7041] rounded-full mx-auto mt-4"></div>
            <p className="text-gray-500 text-sm mt-3 font-medium">
              Autoplay live snippets and photos capturing the essence of togetherness and service
            </p>
          </div>
        </div>

        {/* Infinite Marquee Slider */}
        <div className="marquee-container relative w-full overflow-hidden py-4 bg-gray-50/50 border-y border-gray-100">
          <div className="animate-marquee-sync flex gap-6 px-3">
            {/* Render list twice to ensure infinite scrolling loop */}
            {[...mediaItems, ...mediaItems].map((item, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(item)}
                className="relative h-[240px] w-[320px] sm:h-[280px] sm:w-[400px] flex-shrink-0 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-500 cursor-pointer group bg-black"
              >
                {item.type === 'video' ? (
                  <>
                    <video
                      src={item.src}
                      poster={item.thumbnail}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    {/* Small Play Badge Indicator */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/15">
                      <FiPlay size={10} className="fill-white" />
                      <span>Video Snippet</span>
                    </div>
                  </>
                ) : (
                  <img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500"
                  />
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-[#fdf8f4] to-[#ece9f8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[#ef7041] uppercase tracking-widest">Voices</span>
            <h2 className="text-4xl font-extrabold text-[#102167] mt-2">
              What Volunteers <span className="text-[#ef7041]">Say</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#102167] to-[#ef7041] rounded-full mx-auto mt-4"></div>
          </div>

          <div ref={testimonialsRef} className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => {
              const delayClass = i === 0 ? 'delay-75' : i === 1 ? 'delay-150' : 'delay-300';
              return (
                <div
                  key={i}
                  className={`bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100/80 relative opacity-0 ${testimonialsVisible ? `reveal-fade-in-up ${delayClass}` : ''}`}
                >
                  {/* Accent Star Group */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, s) => (
                      <HiOutlineStar key={s} size={15} className="text-[#ef7041] fill-[#ef7041]" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-8 italic">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl ${t.color} flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0 shadow-md`}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-gray-800">{t.name}</p>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal (Preview Mode) */}
      {activeMedia && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
          {/* Close Area */}
          <div className="absolute inset-0 cursor-pointer" onClick={closeLightbox} />

          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50 border border-white/10"
          >
            <FiX size={24} />
          </button>

          {/* Media Frame */}
          <div className="relative max-w-4xl w-full max-h-[80vh] flex flex-col items-center justify-center z-10 select-none">
            {activeMedia.type === 'video' ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <video
                  src={activeMedia.src}
                  poster={activeMedia.thumbnail}
                  autoPlay
                  controls
                  loop
                  muted={modalMuted}
                  playsInline
                  className="rounded-2xl max-h-[70vh] max-w-full object-contain shadow-2xl"
                />
                {/* Audio Toggle Button */}
                <button
                  onClick={() => setModalMuted(!modalMuted)}
                  className="absolute bottom-6 right-6 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full border border-white/20 hover:scale-105 transition-all z-20 flex items-center justify-center"
                >
                  {modalMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
                </button>
              </div>
            ) : (
              <img
                src={activeMedia.src}
                alt={activeMedia.label}
                className="rounded-2xl max-h-[70vh] max-w-full object-contain shadow-2xl"
              />
            )}

            {/* Info Footer */}
            <div className="mt-4 text-center text-white px-6 max-w-xl">
              <span className="text-xs text-[#ef7041] font-extrabold uppercase tracking-widest">
                {activeMedia.category}
              </span>
              <h3 className="text-xl font-bold mt-1">{activeMedia.label}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryAndTestimonials;
