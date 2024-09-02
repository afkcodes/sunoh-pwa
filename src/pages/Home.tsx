import Tile from '~components/Tile/Tile';

import useViewTransition from '~hooks/useViewTransition';

const Home = () => {
  const navigate = useViewTransition();
  // const { openSheet } = useBottomSheet();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className='flex flex-col gap-3 px-2 py-2'>
      <div className='grid w-full grid-cols-2 gap-8 pt-2'>
        {[1, 2, 3, 4, 8, 5, 6, 55, 6, 77, 88, 888, 8888, 12].map((item) => (
          <Tile
            onClick={() => {
              handleNavigate('/search');
            }}
            key={item}
            figureConfig={{
              fit: 'cover',
              radius: 'xs',
              size: 'full',
              mode: 'multi',
              position: 'top',
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
              image: [
                'https://a10.gaanacdn.com/gn_img/albums/ZaP374RWDy/P374AD8BWD/size_l_1720518576.jpg',
                'https://a10.gaanacdn.com/gn_img/albums/Rz4W8vKxD5/4W87PAOO3x/size_l.jpg',
                'https://a10.gaanacdn.com/gn_pl_img/playlists/ogNWkDbmXJ/NWk81dN8bm/size_l_1716975173.webp',
                'https://m.media-amazon.com/images/M/MV5BNDA5OWE3YTUtNjU0Mi00MWI0LTg3ODgtYmUwNzdkNTdiOWQ2XkEyXkFqcGdeQXVyOTI3MzI4MzA@._V1_.jpg',
              ],
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
