import Tile from '~components/Tile/Tile';

import useViewTransition from '~hooks/useViewTransition';

const Home = () => {
  const navigate = useViewTransition();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className='w-full h-full bg-background'>
      <div className='z-0 grid w-full grid-cols-2 gap-8 pt-2'>
        {[1, 2, 3, 4, 8, 5, 6, 55, 6, 77, 88, 888, 8888, 12].map((item) => (
          <Tile
            onClick={() => {
              handleNavigate('/search');
            }}
            key={item}
            figureConfig={{
              fit: 'cover',
              radius: 'xxxs',
              size: 'full',
              mode: 'multi',
            }}
            titleConfig={{
              color: 'primary',
              size: 'md',
              weight: 'medium',
            }}
            subTitleConfig={{
              color: 'light',
              size: 'sm',
            }}
            data={{
              image:
                'https://i.etsystatic.com/17257718/r/il/1557b9/2441195192/il_570xN.2441195192_8kka.jpg',
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
  );
};

export default Home;
