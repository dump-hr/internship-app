type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const LayoutSpacing: React.FC<Props> = ({ children, ...handlers }) => {
  const style = {
    maxWidth: '1000px',
    margin: '0 auto',
  };

  return (
    <div style={style} {...handlers}>
      {children}
    </div>
  );
};

export default LayoutSpacing;
