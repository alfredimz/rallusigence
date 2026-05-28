import { Loader2 } from 'lucide-react'
import { CSSProperties } from 'react'

interface ButtonProps {
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  full?: boolean
  href?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  style?: CSSProperties
  'data-track-cta'?: string
}

export default function Button({
  variant = 'primary',
  size = 'md',
  full = false,
  href,
  onClick,
  disabled = false,
  loading = false,
  children,
  className = '',
  type = 'button',
  style,
  'data-track-cta': dataTrackCta,
  ...props
}: ButtonProps) {
  const baseClasses = 'rs-btn'
  const variantClass = `rs-btn--${variant}`
  const sizeClass = size !== 'md' ? `rs-btn--${size}` : ''
  const fullClass = full ? 'rs-btn--full' : ''

  const classes = [
    baseClasses,
    variantClass,
    sizeClass,
    fullClass,
    className
  ].filter(Boolean).join(' ')

  const buttonProps = {
    className: classes,
    style,
    disabled: disabled || loading,
    'data-track-cta': dataTrackCta,
    ...props
  }

  const content = (
    <>
      {loading && (
        <Loader2 size={16} className="animate-spin" />
      )}
      {loading ? 'Enviando...' : children}
    </>
  )

  if (href && !disabled && !loading) {
    return (
      <a href={href} {...buttonProps}>
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      {...buttonProps}
    >
      {content}
    </button>
  )
}