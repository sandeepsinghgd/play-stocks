import React, { useState } from "react";
const Preview = ({ file }: any) => {
  const [preview, setPreview] = useState<any>();

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };

  return (
    <div>
      <img src={preview} alt="logo" height="90" width="90" />
    </div>
  );
};

export default Preview;
