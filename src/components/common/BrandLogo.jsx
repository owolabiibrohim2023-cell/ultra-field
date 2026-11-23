// Ultrafield Logistics brand mark — a stylized container/truck glyph.
export default function BrandLogo({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#070b14" />
      <path
        d="M12 40h22a4 4 0 0 0 4-4V22a4 4 0 0 0-4-4H12z"
        fill="none"
        stroke="#3563f9"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M34 40h10a5 5 0 0 0 5-5V27a5 5 0 0 0-5-5H34z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="47" r="3.5" fill="#3563f9" />
      <circle cx="43" cy="47" r="3.5" fill="#ffffff" />
    </svg>
  )
}
