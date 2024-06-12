import { Card } from "antd";
import { CardProps } from "antd/lib/card";

export const CustomCardFullWidth = (props: CardProps) => {
  const { children, style } = props;
  console.log(style)
  return (
    <Card
      {...props}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
        width: "180%"
      }}
    >
      {children}
    </Card>
  );
};
