import { forwardRef } from 'react'

// Reusable labeled input/textarea with accessible error feedback.
export const FormField = forwardRef(function FormField(
  { label, name, error, hint, required = false, children, className = '' },
  ref
) {
  const fieldId = name
  const describedBy = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="mb-1.5 block text-sm font-semibold text-ink-900">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children(fieldId, describedBy, ref) || (
        <input id={fieldId} name={name} ref={ref} aria-describedby={describedBy} className="field" />
      )}
      {hint && !error && (
        <p id={`${fieldId}-hint`} className="mt-1.5 text-xs text-ink-700/55">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${fieldId}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
})

export function TextInput({ id, describedBy, error, ref, ...props }) {
  return (
    <input
      id={id}
      ref={ref}
      aria-describedby={describedBy}
      aria-invalid={Boolean(error) || undefined}
      className={`field ${error ? 'field-error' : ''}`}
      {...props}
    />
  )
}

export function TextArea({ id, describedBy, error, ref, rows = 4, ...props }) {
  return (
    <textarea
      id={id}
      ref={ref}
      rows={rows}
      aria-describedby={describedBy}
      aria-invalid={Boolean(error) || undefined}
      className={`field resize-y ${error ? 'field-error' : ''}`}
      {...props}
    />
  )
}

export function Select({ id, describedBy, error, ref, children, ...props }) {
  return (
    <select
      id={id}
      ref={ref}
      aria-describedby={describedBy}
      aria-invalid={Boolean(error) || undefined}
      className={`field cursor-pointer appearance-none bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10 ${
        error ? 'field-error' : ''
      }`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%231c2739' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
      }}
      {...props}
    >
      {children}
    </select>
  )
}
