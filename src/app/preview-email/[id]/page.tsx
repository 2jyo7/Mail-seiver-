import PreviewOneEmail from "@/component/PreviewOneEmail";
import React from "react";

const EmailPreview = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <PreviewOneEmail id={params.id} />
    </div>
  );
};

export default EmailPreview;
