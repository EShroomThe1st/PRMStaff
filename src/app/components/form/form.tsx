import { Form, FormProps } from "antd";
import { RequiredFields } from "../../utils/helpers";

interface DefaultFormProps
  extends Omit<
    RequiredFields<FormProps, "initialValues" | "name">,
    "layout" | "scrollToFirstError"
  > {}

export function DefaultForm(props: DefaultFormProps) {
  const { children } = props;
  return (
    <Form
      {...props}
      layout="vertical"
      scrollToFirstError={{
        behavior: "smooth",
        block: "center",
        inline: "center",
      }}
    >
      <>{children}</>
    </Form>
  );
}
