import { Button, ButtonProps } from "antd";

export function PrimaryButton(props: ButtonProps) {
  const { children, style } = props;
  return (
    <Button type="primary" {...props} style={{...style, backgroundColor:"#c96612"}}>
      {children}
    </Button>
  );
}

export function OutlineButton(props: ButtonProps) {
  const { children, style } = props;
  return (
    <>
    <Button type="default" {...props}  className='custom-cancel-button' style={{...style, marginRight:"2%"}}>
      {children}
    </Button>
    <style>
        {`
          .custom-cancel-button {
            transition: all 0.3s;
          }

          .custom-cancel-button:hover {
            color: #c96612 !important;
            border-color: #c96612 !important
          }
        `}
      </style>
    </>
  );
}

interface IconButtonProps extends Omit<ButtonProps, "icon"> {
  icon: React.ReactNode;
}

export function IconButton(props: IconButtonProps) {
  const { icon, children } = props;
  return (
    <Button type="text" {...props} size="large" icon={icon}>
      {children}
    </Button>
  );
}