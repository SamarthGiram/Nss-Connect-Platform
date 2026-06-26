import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import nssLogo from '../../../assets/nss.png';

/* ─── SVG: Two hands holding NSS logo with leaves/birds ─── */
const HeroIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 480 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[520px]">

      {/* ── Background lavender blob top-right ── */}
      <ellipse cx="420" cy="80" rx="110" ry="90" fill="#ece9f8" opacity="0.7" />

      {/* ── Clouds / birds ── */}
      {/* Cloud 1 */}
      <g opacity="0.5">
        <ellipse cx="300" cy="55" rx="28" ry="14" fill="#d9d5ef"/>
        <ellipse cx="280" cy="62" rx="18" ry="12" fill="#d9d5ef"/>
        <ellipse cx="318" cy="62" rx="18" ry="12" fill="#d9d5ef"/>
      </g>
      {/* Cloud 2 small */}
      <g opacity="0.4">
        <ellipse cx="420" cy="130" rx="18" ry="9" fill="#d9d5ef"/>
        <ellipse cx="406" cy="135" rx="12" ry="8" fill="#d9d5ef"/>
        <ellipse cx="432" cy="135" rx="12" ry="8" fill="#d9d5ef"/>
      </g>
      {/* Bird 1 */}
      <path d="M340 90 Q345 85 350 90" stroke="#9b96cc" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M350 90 Q355 85 360 90" stroke="#9b96cc" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Bird 2 */}
      <path d="M395 165 Q399 161 403 165" stroke="#9b96cc" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M403 165 Q407 161 411 165" stroke="#9b96cc" strokeWidth="1.5" strokeLinecap="round" fill="none"/>

      {/* ── LEFT HAND ── */}
      <g>
        {/* Palm */}
        <path d="M145 320 C130 300 118 270 120 240 C122 220 130 200 148 188
                 C158 182 165 188 166 198 L168 220
                 C168 220 172 200 175 186 C178 175 188 172 194 180
                 C200 188 198 210 196 225
                 C196 225 202 205 206 193 C210 183 220 182 224 190
                 C228 198 224 220 220 235
                 C220 235 224 220 230 212 C236 205 244 207 246 216
                 C248 225 244 250 238 268
                 L228 300 C215 330 200 345 180 355 Z"
          fill="none" stroke="#b8b0e8" strokeWidth="2.5" strokeLinejoin="round"/>
        {/* Fingers hint lines */}
        <path d="M168 220 L166 300" stroke="#b8b0e8" strokeWidth="1.5" opacity="0.6"/>
        <path d="M196 225 L194 305" stroke="#b8b0e8" strokeWidth="1.5" opacity="0.6"/>
        <path d="M220 235 L218 308" stroke="#b8b0e8" strokeWidth="1.5" opacity="0.6"/>
        {/* Wrist */}
        <path d="M145 320 Q155 340 180 355 Q200 365 228 358 L238 268" stroke="#b8b0e8" strokeWidth="2.5" fill="none"/>
      </g>

      {/* ── RIGHT HAND ── */}
      <g>
        <path d="M335 320 C350 300 362 270 360 240 C358 220 350 200 332 188
                 C322 182 315 188 314 198 L312 220
                 C312 220 308 200 305 186 C302 175 292 172 286 180
                 C280 188 282 210 284 225
                 C284 225 278 205 274 193 C270 183 260 182 256 190
                 C252 198 256 220 260 235
                 C260 235 256 220 250 212 C244 205 236 207 234 216
                 C232 225 236 250 242 268
                 L252 300 C265 330 280 345 300 355 Z"
          fill="none" stroke="#b8b0e8" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M312 220 L314 300" stroke="#b8b0e8" strokeWidth="1.5" opacity="0.6"/>
        <path d="M284 225 L286 305" stroke="#b8b0e8" strokeWidth="1.5" opacity="0.6"/>
        <path d="M260 235 L262 308" stroke="#b8b0e8" strokeWidth="1.5" opacity="0.6"/>
        <path d="M335 320 Q325 340 300 355 Q280 365 252 358 L242 268" stroke="#b8b0e8" strokeWidth="2.5" fill="none"/>
      </g>

      {/* ── LEAVES LEFT ── */}
      {/* Stem */}
      <path d="M155 380 Q148 340 155 300 Q160 270 150 240" stroke="#b8b0e8" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Leaves */}
      <path d="M155 330 Q135 315 130 295 Q150 305 155 330Z" fill="#c8c2e8" opacity="0.7"/>
      <path d="M152 305 Q128 290 130 268 Q150 278 152 305Z" fill="#b8b0e0" opacity="0.6"/>
      <path d="M156 355 Q138 345 136 325 Q154 332 156 355Z" fill="#d0caf0" opacity="0.65"/>
      <path d="M150 275 Q130 260 134 240 Q150 252 150 275Z" fill="#c0b8e4" opacity="0.55"/>

      {/* ── LEAVES RIGHT ── */}
      <path d="M325 380 Q332 340 325 300 Q320 270 330 240" stroke="#b8b0e8" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M325 330 Q345 315 350 295 Q330 305 325 330Z" fill="#c8c2e8" opacity="0.7"/>
      <path d="M328 305 Q352 290 350 268 Q330 278 328 305Z" fill="#b8b0e0" opacity="0.6"/>
      <path d="M324 355 Q342 345 344 325 Q326 332 324 355Z" fill="#d0caf0" opacity="0.65"/>
      <path d="M330 275 Q350 260 346 240 Q330 252 330 275Z" fill="#c0b8e4" opacity="0.55"/>

      {/* ── Small bottom leaves ── */}
      <path d="M195 395 Q180 378 185 360 Q198 372 195 395Z" fill="#c8c2e8" opacity="0.6"/>
      <path d="M285 395 Q300 378 295 360 Q282 372 285 395Z" fill="#c8c2e8" opacity="0.6"/>

      {/* ── Bottom-right lavender blob ── */}
      <ellipse cx="440" cy="370" rx="80" ry="70" fill="#ece9f8" opacity="0.6"/>
      {/* Extra leaves on right corner */}
      <path d="M430 410 Q415 390 422 372 Q434 385 430 410Z" fill="#b8b0e0" opacity="0.5"/>
      <path d="M455 400 Q442 382 448 365 Q460 377 455 400Z" fill="#c8c2e8" opacity="0.5"/>
      <path d="M445 425 Q428 408 434 390 Q447 402 445 425Z" fill="#d0caf0" opacity="0.5"/>
    </svg>

    {/* ── NSS Logo floating above hands ── */}
    <div className="absolute" style={{ top: '6%', left: '50%', transform: 'translateX(-50%)' }}>
      <div className="w-[130px] h-[130px] rounded-full overflow-hidden border-4 border-[#102167]/30 shadow-2xl bg-white p-1">
        <img src={nssLogo} alt="NSS" className="w-full h-full object-contain rounded-full" />
      </div>
    </div>
  </div>
);

/* ─── Feature card in bottom bar ─── */
const Feature = ({ emoji, title, sub, border }) => (
  <div className={`flex items-center gap-4 px-6 py-5 ${border ? 'border-r border-gray-100' : ''}`}>
    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-xl text-[#b8b0e8]">
      {emoji}
    </div>
    <div>
      <p className="text-[13px] font-bold text-[#102167]">{title}</p>
      <p className="text-[11px] text-gray-400 font-medium mt-0.5">{sub}</p>
    </div>
  </div>
);

const HeroSection = () => (
  <section id="home" className="bg-[#fdf8f4] min-h-screen pt-[68px] overflow-hidden relative">

    {/* Background decoration blobs */}
    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#ece9f8] rounded-full opacity-40 blur-3xl translate-x-20 -translate-y-10 pointer-events-none"></div>
    <div className="absolute bottom-32 right-0 w-[220px] h-[220px] bg-[#f0edfc] rounded-full opacity-50 blur-2xl translate-x-10 pointer-events-none"></div>

    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 gap-8 items-center" style={{ minHeight: 'calc(100vh - 130px)' }}>

        {/* ── LEFT ── */}
        <div className="space-y-6 py-12">
          {/* Tag line */}
          <p className="text-[11px] font-bold tracking-[0.25em] text-gray-400 uppercase">
            Service &nbsp;|&nbsp; Unity &nbsp;|&nbsp; Development
          </p>

          {/* Headline */}
          <h1 className="text-[62px] font-black leading-none tracking-tight">
            <span className="block text-[#102167]">Not Me</span>
            <span className="block">
              <span className="text-[#102167]">But </span>
              <span className="text-[#ef7041]">You</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[15px] text-gray-500 font-medium leading-relaxed max-w-[300px]">
            Let's come together to make<br/>a meaningful difference.
          </p>

          {/* CTA */}
          <Link to="/login"
            className="inline-flex items-center gap-2 bg-[#102167] text-white font-bold px-7 py-3.5 rounded-lg text-sm hover:bg-[#1a2f85] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group">
            Explore More
            <FiArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* ── RIGHT — Illustration ── */}
        <div className="relative h-[480px]">
          <HeroIllustration />
        </div>
      </div>
    </div>

    {/* ── Bottom Feature Bar ── */}
    <div className="mx-8 mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-4 divide-x divide-gray-100">
        <Feature emoji="👥" title="Community Service" sub="Serve with heart" border />
        <Feature emoji="🏅" title="Leadership" sub="Lead by example" border />
        <Feature emoji="❤️" title="Social Responsibility" sub="Think for others" border />
        <Feature emoji="🏛️" title="Nation Building" sub="Work for the nation" />
      </div>
    </div>
  </section>
);

export default HeroSection;
