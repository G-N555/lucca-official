const styles = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  p: 'leading-7 [&:not(:first-child)]:mt-6',
};

type TypographyProps = {
  children: JSX.Element | string;
  variant: keyof typeof styles;
};

export const Typography = ({ children, variant }: TypographyProps) => {
  return <div className={variant}>{children}</div>;
};
