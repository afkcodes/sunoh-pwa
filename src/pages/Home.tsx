import Tile from '~components/Tile/Tile';

import useViewTransition from '~hooks/useViewTransition';

const Home = () => {
  const navigate = useViewTransition();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <div className='w-full bg-background'>
        <div className='z-0 grid items-center justify-center w-full grid-cols-2 justify-items-center'>
          {[1, 2, 3, 4, 8, 5, 6, 55, 6, 77, 88, 888, 8888, 12].map((item) => (
            <Tile
              onClick={() => {
                handleNavigate('/search');
              }}
              key={item}
              figureConfig={{
                fit: 'cover',
                radius: 'xxxs',
                size: 'xl',
              }}
              titleConfig={{
                color: 'primary',
                size: 'sm',
                weight: 'medium',
              }}
              subTitleConfig={{
                color: 'light',
                size: 'xs',
              }}
              data={{
                image:
                  'https://i.pinimg.com/originals/bf/e1/c3/bfe1c3d2c13dccf5a3e5493257c3b7ff.png',
                title: 'Big Hero 6',
                subtitle: 'Baymax',
              }}
              config={{
                image: 'image',
                title: 'title',
                subtitle: 'subtitle',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
