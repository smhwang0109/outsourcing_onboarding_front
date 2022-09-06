interface BtnProps {
  text: string;
  type: "fill" | "outline";
  color: "primary" | "gray";
  size: "s" | "l" | "xl";
  width: string;
  disabled?: boolean;
  onClick?: any;
}

export default function Btn({
  text,
  type,
  color,
  size,
  width,
  disabled,
  onClick,
}: BtnProps) {
  return (
    <button
      className={"btn " + [color + "-" + type, size].join(" ")}
      style={{ width: width }}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
      <style jsx>{`
        .btn {
          padding: 0 12px;
          border-radius: 8px;
          font-family: PretendardVariable;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.5;
          letter-spacing: normal;
          text-align: center;
        }
        .s {
          width: 67px;
          height: 32px;
          font-size: 14px;
          font-weight: 500;
        }
        .l {
          width: 180px;
          height: 48px;
          font-size: 16px;
          font-weight: 600;
        }
        .xl {
          width: 372px;
          height: 56px;
          font-size: 18px;
          font-weight: 600;
        }
        .primary-fill {
          border: none;
          background-color: var(--primary-primary);
          color: var(--gray-scale-white);
          cursor: pointer;
        }
        .primary-fill:hover {
          background-color: var(--primary-p-800);
        }
        .primary-fill:disabled {
          background-color: var(--gray-scale-gray-2);
          color: var(--gray-scale-gray-5);
          cursor: not-allowed;
        }
        .primary-outline {
          border: solid 1px var(--primary-primary);
          background-color: var(--none);
          color: var(--primary-primary);
          cursor: pointer;
        }
        .primary-outline:hover {
          background-color: var(--primary-p-100);
        }
        .primary-outline:disabled {
          border: none;
          background-color: var(--gray-scale-gray-2);
          color: var(--gray-scale-gray-5);
          cursor: not-allowed;
        }
        .gray-outline {
          border: solid 1px var(--gray-scale-gray-3);
          background-color: var(--none);
          color: var(--gray-scale-gray-9);
          cursor: pointer;
        }
        .gray-outline:hover {
          background-color: var(--gray-scale-gray-1);
        }
        .gray-outline:disabled {
          border: none;
          background-color: var(--gray-scale-gray-2);
          color: var(--gray-scale-gray-5);
          cursor: not-allowed;
        }
      `}</style>
    </button>
  );
}
