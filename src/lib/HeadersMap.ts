import { EmailHeader } from "@/types/EmailProps";

const extractImportantHeaders = (headers: EmailHeader[]) => {
  const headerMap: Record<string, string> = {};

  const importantFields = ["Subject", "From", "To", "Date", "Reply-To"];

  for (const field of importantFields) {
    const header = headers.find(
      (h) => h.name.toLowerCase() === field.toLowerCase()
    );
    if (header) {
      headerMap[field] = header.value;
    }
  }

  return headerMap;
};

export default extractImportantHeaders;
