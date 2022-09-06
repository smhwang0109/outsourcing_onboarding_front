interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  type?: "text" | "number" | "password";
  shape?: "vertical" | "horizontal";
  disabled?: boolean;
  height?: string;
  value?: string | number;
  onChange?: any;
}

export default function Input({
  label,
  id,
  placeholder,
  type = "text",
  shape = "horizontal",
  disabled,
  height,
  value,
  onChange,
}: InputProps) {
  return (
    <div className="input-container">
      <label className="Body2SMedium" htmlFor={id}>
        {label}
      </label>
      {shape === "horizontal" ? (
        <input
          type={type}
          className="input-field"
          id={id}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e)}
        />
      ) : (
        <textarea
          className="input-field"
          id={id}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onInput={(e) => onChange(e)}
        />
      )}
      <style jsx>{`
        .input-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        label {
          height: 21px;
          text-align: left;
          color: var(--gray-scale-gray-8);
        }
        .input-field {
          height: ${!!height ? height : "48px"};
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          background-color: var(--gray-scale-gray-1);
          resize: none;
        }
        .input-field::placeholder {
          color: var(--gray-scale-gray-6);
        }
        .input-field:focus {
          outline: solid 1px var(--primary-p-800);
        }
        .input-field:disabled {
          background-color: var(--gray-scale-gray-2);
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
