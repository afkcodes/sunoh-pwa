import Tile from '~components/Tile/Tile';

const Search = () => {
  return (
    <div className='min-h-screen bg-background'>
      <div className='z-0 grid items-center justify-center w-full min-h-screen grid-cols-2 justify-items-center'>
        {[1, 2, 3, 4, 8, 5, 6].map((item) => (
          <Tile
            onClick={() => {}}
            key={item}
            figureConfig={{
              fit: 'contain',
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
                'https://dx35vtwkllhj9.cloudfront.net/universalstudios/despicable-me-4/images/gallery/image6.jpg',
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
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus cum doloribus
        autem, exercitationem omnis quo ipsa ipsam ratione consectetur est aliquam
        doloremque accusantium vitae minima et tempore illo velit ex.
      </p>
    </div>
  );
};

export default Search;
