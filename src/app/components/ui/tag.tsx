import { Tag, TagProps } from "antd";

const CustomTag = (props: TagProps) => {
  const { children } = props;
  return (
    <Tag
      {...props}
      color="#87d068"
    >
      {children}
    </Tag>
  );
};

export default CustomTag;