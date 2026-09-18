import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = {
  children: ReactNode
  type?: 'button' | 'submit'
  variant?: ButtonVariant
  onClick?: () => void
}

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`button button-block button-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
