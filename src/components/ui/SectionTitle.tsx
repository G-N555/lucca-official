import { Typography } from '@mui/material';

type SectionTitleProps = {
  title: string;
};

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return <Typography variant="h6">{title}</Typography>;
};
