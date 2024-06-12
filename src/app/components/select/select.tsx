import {
  ConfigProvider,
  Select,
  SelectProps,
  TreeSelect,
  TreeSelectProps,
} from "antd";

export function FormSelect(props: SelectProps) {
  console.log(props.options);
  return <Select style={{ height: "42px", minHeight: "42px" }} {...props} />;
}

interface FormTreeSelectProps {
  treeData: TreeSelectProps["treeData"];
}

export function FormTreeSelect(props: FormTreeSelectProps) {
  //form also pass value and id besides treeData
  const { treeData, ...rest } = props;

  const addDisabledField = (
    data: TreeSelectProps["treeData"],
  ): TreeSelectProps["treeData"] => {
    return data?.map((node) => {
      if (node.children && node.children.length > 0) {
        return {
          ...node,
          disabled: true,
          children: addDisabledField(node.children),
        };
      } else {
        return node;
      }
    });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextDisabled: "black",
        },
      }}
    >
      <TreeSelect
        showSearch
        style={{ width: "100%", height: "42px" }}
        dropdownStyle={{ maxHeight: 400, overflow: "auto", cursor: "default" }}
        placeholder="Please select"
        treeData={addDisabledField(treeData)}
        {...rest}
      />
    </ConfigProvider>
  );
}

export function SelectMultiple(props: SelectProps) {
  return <FormSelect mode="multiple" allowClear {...props} />;
}