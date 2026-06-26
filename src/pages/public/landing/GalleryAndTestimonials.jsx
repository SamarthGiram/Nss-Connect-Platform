import { HiOutlineStar } from 'react-icons/hi';

// Gallery items - colored placeholder cards
const galleryItems = [
  { label: 'Tree Plantation Drive', color: 'from-green-400 to-emerald-600', emoji: '🌱' },
  { label: 'Blood Donation Camp', color: 'from-red-400 to-rose-600', emoji: '🩸' },
  { label: 'Swachhta Abhiyan', color: 'from-blue-400 to-cyan-600', emoji: '🧹' },
  { label: 'Covid Awareness Drive', color: 'from-violet-400 to-purple-600', emoji: '🏥' },
  { label: 'Rural Education Camp', color: 'from-amber-400 to-orange-500', emoji: '📚' },
  { label: 'Flood Relief Work', color: 'from-[#102167] to-blue-700', emoji: '🤝' },
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

const GalleryAndTestimonials = () => (
  <>
    {/* Gallery */}
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#ef7041] uppercase tracking-widest">Moments</span>
          <h2 className="text-4xl font-extrabold text-[#102167] mt-2">Our <span className="text-[#ef7041]">Gallery</span></h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#102167] to-[#ef7041] rounded-full mx-auto mt-4"></div>
          <p className="text-gray-500 text-sm mt-3 font-medium">Captured moments of service, community and togetherness</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <div key={i}
              className={`relative bg-gradient-to-br ${item.color} rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              style={{ aspectRatio: i === 0 || i === 5 ? '4/3' : '1/1' }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                <p className="text-sm font-bold text-center text-white/90">{item.label}</p>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-bold bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300">
                  View Photo
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-20 bg-gradient-to-b from-[#f5f7ff] to-[#eef2ff]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#ef7041] uppercase tracking-widest">Voices</span>
          <h2 className="text-4xl font-extrabold text-[#102167] mt-2">What Volunteers <span className="text-[#ef7041]">Say</span></h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#102167] to-[#ef7041] rounded-full mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, s) => (
                  <HiOutlineStar key={s} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-extrabold text-gray-800">{t.name}</p>
                  <p className="text-xs text-gray-400 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default GalleryAndTestimonials;
