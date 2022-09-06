interface ChipProps {
  text: string;
  state: "on" | "off";
  onClick?: any
}

export default function Chip({ text, state, onClick }: ChipProps) {
  return (
    <span className={state + " Body2SSemibold"} onClick={(e) => onClick(e)}>
      {text}
      <style jsx>{`
        span {
          height: 40px;
          display: flex;
          align-items: center;
          padding: 0 16px;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
        }
        .on {
          background-color: var(--primary-primary);
          color: var(--gray-scale-white);
        }
        .on:hover {
          background-color: var(--primary-p-800);
        }
        .off {
          border: solid 1px var(--gray-scale-gray-3);
          color: var(--gray-scale-gray-8);
        }
        .off:hover {
          background-color: var(--gray-scale-gray-1);
        }
      `}</style>
    </span>
  );
}
