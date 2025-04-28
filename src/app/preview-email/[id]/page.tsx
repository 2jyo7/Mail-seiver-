import PreviewOneEmail from "@/component/PreviewOneEmail";
import React from "react";

const EmailPreview = ({ id }: { id: string }) => {
  return (
    <div>
      <PreviewOneEmail id={id} />
    </div>
  );
};

export default EmailPreview;
