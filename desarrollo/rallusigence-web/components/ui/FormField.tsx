import { ChangeEvent, FocusEvent } from 'react'

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel' | 'textarea'
  placeholder?: string
  required?: boolean
  error?: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function FormField({
  label,
  name,
  type = 'text',
  placeholder = '',
  required = false,
  error = '',
  value = '',
  onChange,
  onBlur
}: FormFieldProps) {
  const inputClasses = `input-field ${error ? 'input-field--error' : ''} ${type === 'textarea' ? 'input-field--textarea' : ''}`
  const labelClasses = `input-label ${required ? 'input-label--required' : ''}`

  const sharedProps = {
    id: name,
    name,
    className: inputClasses,
    placeholder,
    value,
    onChange,
    onBlur,
    'aria-describedby': error ? `${name}-error` : undefined,
  }

  return (
    <div className="form-group">
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>

      {type === 'textarea' ? (
        <textarea
          {...sharedProps}
          rows={4}
          aria-invalid={error ? true : false}
        />
      ) : (
        <input
          type={type}
          {...sharedProps}
          aria-invalid={error ? true : false}
        />
      )}

      <div
        id={`${name}-error`}
        className="input-error"
        role={error ? 'alert' : undefined}
        aria-live={error ? 'polite' : undefined}
      >
        {error}
      </div>
    </div>
  )
}