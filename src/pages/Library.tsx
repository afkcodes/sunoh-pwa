import Tile from '~components/Tile/Tile';
import useViewTransition from '~hooks/useViewTransition';

const Library = () => {
  const navigate = useViewTransition();

  return (
    <div className='w-full px-2 py-2'>
      <div className='grid items-center justify-center w-full grid-cols-2 justify-items-center'>
        {[1, 2, 3, 4, 8, 5, 6, 55, 6, 77, 88, 888, 8888, 12].map((item) => (
          <Tile
            onClick={() => {
              navigate('/home');
            }}
            key={item}
            figureConfig={{
              fit: 'cover',
              radius: 'xxxs',
              size: 'xxl',
              position: 'top',
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
              image: [
                'https://ichef.bbci.co.uk/news/976/cpsprodpb/3bed/live/849864f0-295a-11ef-a13a-0b8c563da930.jpg',
              ],
              title: 'Inside out 2',
              subtitle: 'Joy',
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

export default Library;
