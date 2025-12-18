interface LogoProps {
  className?: string
  variant?: 'default' | 'white'
}

export function Logo({ className = '', variant = 'default' }: LogoProps) {
  const gradientId = variant === 'white' ? 'logo-gradient-white' : 'logo-gradient'
  const textColor = variant === 'white' ? '#FFFFFF' : '#1F2937'
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon - Rocket with AI elements */}
      <svg 
        width="40" 
        height="40" 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="50%" stopColor="#FF8E53" />
            <stop offset="100%" stopColor="#6B5FFF" />
          </linearGradient>
        </defs>
        
        {/* Outer circle with circuit pattern */}
        <circle cx="20" cy="20" r="18" fill={`url(#${gradientId})`} opacity="0.1" />
        
        {/* Rocket body */}
        <path
          d="M20 8 L26 22 L23 22 L23 28 L17 28 L17 22 L14 22 Z"
          fill={`url(#${gradientId})`}
        />
        
        {/* Rocket window */}
        <circle cx="20" cy="16" r="2.5" fill="white" opacity="0.9" />
        
        {/* Rocket flames */}
        <path
          d="M17 28 L15 32 L17 30 L20 33 L23 30 L25 32 L23 28 Z"
          fill="#FFB84D"
        />
        
        {/* Target circles */}
        <circle cx="20" cy="20" r="16" stroke={`url(#${gradientId})`} strokeWidth="1.5" opacity="0.3" strokeDasharray="3 3" />
        
        {/* AI circuit nodes */}
        <circle cx="12" cy="12" r="1.5" fill="#FF6B35" />
        <circle cx="28" cy="12" r="1.5" fill="#6B5FFF" />
        <circle cx="12" cy="24" r="1.5" fill="#6B5FFF" />
        <circle cx="28" cy="24" r="1.5" fill="#FF6B35" />
        
        {/* Connecting lines (circuit) */}
        <path d="M12 12 L16 16" stroke="#FF6B35" strokeWidth="1" opacity="0.4" />
        <path d="M28 12 L24 16" stroke="#6B5FFF" strokeWidth="1" opacity="0.4" />
      </svg>

      {/* Logo Text */}
      <div className="flex items-baseline gap-1">
        <span 
          className="text-2xl font-black tracking-tight"
          style={{ 
            color: variant === 'white' ? '#FFFFFF' : textColor,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          CareerLift
        </span>
      </div>
    </div>
  )
}

