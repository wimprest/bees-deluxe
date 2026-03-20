interface AdminFormFieldProps {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  helper?: string;
  required?: boolean;
  rows?: number;
}

const inputStyles =
  "w-full rounded-none border border-brand-teal/20 bg-brand-slate px-4 py-3 text-brand-white placeholder:text-brand-muted focus:border-brand-teal focus:outline-none";

export function AdminFormField({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  helper,
  required,
  rows,
}: AdminFormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1 block text-xs uppercase tracking-wide text-brand-muted"
      >
        {label}
        {required && <span className="text-brand-red"> *</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          rows={rows ?? 4}
          className={inputStyles}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          className={inputStyles}
        />
      )}
      {helper && (
        <p className="mt-1 text-xs text-brand-muted">{helper}</p>
      )}
    </div>
  );
}
