import Tile from '~components/Tile/Tile';
import BottomNavContainer from '~containers/BottomNavContainer';

const App = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full gap-2 overflow-x-hidden text-white bg-background'>
      {/* <p className='text-xxs'>asdasdada</p> */}
      {[1, 2, 3, 4, 8, 5, 6, 7].map((item) => (
        <Tile
          onClick={() => {
            console.log('hello');
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
      <BottomNavContainer />
    </div>
  );
};

export default App;
