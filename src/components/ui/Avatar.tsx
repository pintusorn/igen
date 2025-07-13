interface AvatarProps {
  variant: 1 | 2 | 3 | 4 | 5
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const avatarVariants = {
  1: {
    bg: 'bg-red-500',
    icon: '👤',
    name: 'Avatar 1'
  },
  2: {
    bg: 'bg-green-500',
    icon: '🌟',
    name: 'Avatar 2'
  },
  3: {
    bg: 'bg-purple-500',
    icon: '🎯',
    name: 'Avatar 3'
  },
  4: {
    bg: 'bg-orange-500',
    icon: '🚀',
    name: 'Avatar 4'
  },
  5: {
    bg: 'bg-pink-500',
    icon: '💫',
    name: 'Avatar 5'
  }
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-lg',
  lg: 'w-16 h-16 text-2xl'
}

export function Avatar({ variant, size = 'md', className = '' }: AvatarProps) {
  const avatar = avatarVariants[variant]
  
  return (
    <div 
      className={`${avatar.bg} ${sizeClasses[size]} rounded-full flex items-center justify-center text-white font-bold ${className}`}
      title={avatar.name}
    >
      {avatar.icon}
    </div>
  )
} 