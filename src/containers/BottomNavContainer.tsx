import { useLocation } from 'react-router-dom';
import Button from '~components/Button/Button';
import TextLink from '~components/TextLink/TextLink';
import { NavItems, navItems } from '~constants/navigation';
import useViewTransition from '~hooks/useViewTransition';

const BottomNavContainer = () => {
  const location = useLocation();
  const startViewTransition = useViewTransition();

  const onClick = (path: string) => {
    startViewTransition(path);
  };

  return (
    <div className='flex items-center justify-around h-16 bg-nav-background/90 bottom-nav-container backdrop-blur-md'>
      {navItems.map((item: NavItems) => (
        <div
          key={item.id}
          className='flex flex-col items-center justify-center w-full text-center transition-all duration-300 active:scale-90'>
          <Button
            variant='unstyled'
            classNames='w-full'
            onClick={() => {
              onClick(item.path);
            }}>
            <div className='flex flex-col items-center justify-center'>
              <item.icon
                size={28}
                className={`${
                  location.pathname === item.path
                    ? 'text-primary-light'
                    : 'text-text-primary'
                }`}
              />
              <TextLink
                size='xs'
                classNames='text-xxs'
                color={location.pathname === item.path ? 'accent' : 'primary'}>
                {item.title}
              </TextLink>
            </div>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default BottomNavContainer;
