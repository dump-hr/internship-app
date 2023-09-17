import DUMPLogo from '../../assets/dump-logo.png';
import LayoutSpacing from '../LayoutSpacing/LayoutSpacing';
import c from './LogoHeader.module.css';

type Props = {
  text: string;
};

const LogoHeader: React.FC<Props> = ({ text }) => {
  return (
    <header className={c.header}>
      <LayoutSpacing className={c.layout}>
        <img className={c.logo} src={DUMPLogo} alt="DUMP Logo" />
        <h3 className={c.text}>{text}</h3>
      </LayoutSpacing>
    </header>
  );
};

export default LogoHeader;
