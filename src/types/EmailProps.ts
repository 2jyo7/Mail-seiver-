export interface EmailProps {
  id: string;
  snippet?: string;
  subject?: string;
}

export type EmailHeader = {
  name: string;
  value: string;
};

export type EmailDetails = {
  id: string;
  headers: EmailHeader[];
  snippet?: string;
  body?: string;
};
