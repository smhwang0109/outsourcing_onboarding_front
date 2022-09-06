import Btn from "./Btn"

interface ModalProps {
  active: boolean;
  closeEvent: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
  children: React.ReactNode;
  actionMsg: string;
  actionEvent: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Modal({
  active = false,
  closeEvent,
  title,
  children,
  actionMsg,
  actionEvent,
}: ModalProps) {
  return (
    <>
      <div className="modal-container">
        <span className="modal-title H5MBold">{title}</span>
        <span className="modal-msg Body2MRegular">{children}</span>
        <div className="action-box">
          <Btn text="취소하기" type="outline" size="l" color="gray" width="156px" onClick={closeEvent} />
          <Btn text={actionMsg} type="fill" size="l" color="primary" width="156px" onClick={actionEvent} />
        </div>
      </div>
      <style jsx>{`
        .modal-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 28px 20px 20px 20px;
        }
        .modal-title {
          text-align: center;
          color: var(--gray-scale-black);
        }
        .modal-msg {
          text-align: center;
          color: var(--gray-scale-gray-8);
        }
        .action-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-top: 16px;
        }
      `}</style>
    </>
  );
}
