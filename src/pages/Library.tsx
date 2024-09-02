import Tile from '~components/Tile/Tile';
import { useModal } from '~contexts/ModalContext';
import useViewTransition from '~hooks/useViewTransition';

const Library = () => {
  const navigate = useViewTransition();
  const { openModal } = useModal();

  return (
    <div className='bg-background'>
      <div className='grid items-center justify-center w-full grid-cols-2 justify-items-center'>
        {[1, 2, 3, 4, 8, 5, 6, 55, 6, 77, 88, 888, 8888, 12].map((item) => (
          <Tile
            onClick={() => {
              navigate('/home');
            }}
            onLongPress={() => {
              openModal({
                isOpen: true,
                role: 'drawer',
              });
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
              image:
                'https://m.media-amazon.com/images/I/81OxUOV+7qL._AC_UF1000,1000_QL80_.jpg',
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

export default Library;
