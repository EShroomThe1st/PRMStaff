import { Modal, ModalProps, Typography } from "antd";
import { OutlineButton, PrimaryButton } from "../button/buttons";

export function CustomFormModal(props: ModalProps) {
  const { children, open, title, onCancel, onOk, width, confirmLoading } = props;
  const { Title } = Typography;

  return (
    <Modal
      width={width}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      title={
        <Title
          level={4}
          style={{
            margin: 0,
            textTransform: "uppercase",
            color: "#c96612",
          }}
        >
          {title}
        </Title>
      }
      maskClosable={false}
      destroyOnClose={true}
      footer={[
        <OutlineButton key="cancel" onClick={onCancel} loading={confirmLoading}>
          Cancel
        </OutlineButton>,
        <PrimaryButton key="sumbit" onClick={onOk} loading={confirmLoading}>
          Confirm
        </PrimaryButton>,
      ]}
    >
      <div className="pb-3 pt-5">{children}</div>
    </Modal>
  );
}

export function DeleteModal(props: ModalProps) {
  const { children, open, title, onCancel, onOk, confirmLoading} = props;
  const { Title } = Typography;

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={confirmLoading}
      title={
        <Title
          level={4}
          style={{
            margin: 0,
            textTransform: "uppercase",
            color: "#0071D9",
          }}
        >
          {title}
        </Title>
      }
      maskClosable={false}
      destroyOnClose={true}
      okText="Confirm"
      okType="danger"
      cancelText="Cancel"
    >
      <div className="pb-3 pt-5">{children}</div>
    </Modal>
  );
}
