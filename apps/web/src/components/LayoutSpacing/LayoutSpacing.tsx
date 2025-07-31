type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const LayoutSpacing: React.FC<Props> = ({ children, ...handlers }) => {
  const style = {
    maxWidth: '1300px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  return (
    <div style={style} {...handlers}>
      {children}
    </div>
  );
};
