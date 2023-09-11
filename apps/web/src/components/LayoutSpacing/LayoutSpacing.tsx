type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const LayoutSpacing: React.FC<Props> = ({ children, ...handlers }) => {
  const style = {
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  return (
    <div style={style} {...handlers}>
      {children}
    </div>
  );
};

export default LayoutSpacing;
