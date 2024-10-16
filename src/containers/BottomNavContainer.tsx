import { useLocation } from 'wouter';
import Button from '~components/Button/Button';
import TextLink from '~components/TextLink/TextLink';
import { NavItems, navItems } from '~constants/navigation';
import { searchStoreSnapshot } from '~states/search.store';

const BottomNavContainer = () => {
  const [location, navigate] = useLocation();

  const onClick = (path: string) => {
    navigate(path);
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
              if (item.name === 'search') {
                const searchState = searchStoreSnapshot();
                onClick(`${item.path}?q=${searchState.query}&cat=${searchState.key}`);
                return;
              }
              onClick(item.path);
            }}>
            <div className='flex flex-col items-center justify-center'>
              <item.icon
                size={28}
                className={`${
                  location === item.path ? 'text-primary-light' : 'text-text-primary'
                }`}
              />
              <TextLink
                size='xs'
                classNames='text-xxs'
                color={location === item.path ? 'accent' : 'primary'}>
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
