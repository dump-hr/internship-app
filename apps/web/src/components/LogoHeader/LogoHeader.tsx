import c from './LogoHeader.module.css';

import DUMPLogo from '../../assets/dump-logo.png';

type Props = {
  text: string;
};

const LogoHeader: React.FC<Props> = ({ text }) => {
  return (
    <header className={c.header}>
      <img className={c.logo} src={DUMPLogo} alt="DUMP Logo" />
      <h3 className={c.text}>{text}</h3>
    </header>
  );
};

export default LogoHeader;
