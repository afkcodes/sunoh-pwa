import Button from '~components/Button/Button';
import TextLink from '~components/TextLink/TextLink';
import { HeaderProps } from '~types/component.types';

const Header: React.FC<HeaderProps> = ({ textLinkConfig, actionButtonConfig }) => {
  return (
    <div className='flex items-center justify-between px-2 py-1 my-3'>
      <TextLink {...textLinkConfig} />
      <Button {...actionButtonConfig} />
    </div>
  );
};

export default Header;
