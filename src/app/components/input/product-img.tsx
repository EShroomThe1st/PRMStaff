import { useEffect, useState } from "react";
import { UploadFile, UploadProps } from "antd";
import { UploadFileStatus } from "antd/es/upload/interface";
import { Product } from "~/app/models/product";
import { UploadImg } from "./upload-img";


interface uploadedImage {
  uid: string;
  name: string;
  status: UploadFileStatus | undefined;
  url: string;
}

export default function UploadProductPicture(props: {
  value?: Product["img"];
  setImages: React.Dispatch<
    React.SetStateAction<Product["img"] | undefined>
  >;
}) {
  const { value, setImages } = props;
  let uploadedList: uploadedImage[] = [];
  if (value) {
    uploadedList = value.map((img, index) => {
      return {
        uid: `${-index}`,
        name: img.name,
        status: "done",
        url: img.url ?? "error",
      };
    });
  }

  const [fileList, setFileList] = useState<UploadFile[]>(uploadedList);

  useEffect(() => {
    const reformatImageList = fileList.map((img) => {
      if (img.originFileObj) {
        return {
          name: img.name,
          file: img.originFileObj,
        };
      } else return { name: img.name, url: img.url };
    });
    setImages(reformatImageList);
  }, [fileList, setImages]);

  const handleChange: UploadProps["onChange"] = ({ file, fileList }) => {
    if (file.type != "image/jpeg" && file.type != "image/png") {
      setFileList([]);
      return;
    }
    setFileList(fileList);
  };

  return (
    <UploadImg
      listType="picture-card"
      maxCount={5}
      onChange={handleChange}
      fileList={fileList}
    />
  );
}