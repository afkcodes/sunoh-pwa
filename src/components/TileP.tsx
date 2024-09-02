// const PlaylistTile = ({ images }: any) => {
//   return (
//     <div className='relative w-64 h-64 overflow-hidden rounded-lg shadow-lg'>
//       <div className='absolute inset-0'>
//         <div className='relative w-full h-full'>
//           {images.slice(0, 4).map((image, index) => (
//             <div
//               key={index}
//               className='absolute overflow-hidden transition-all duration-300 rounded-lg shadow-md hover:z-10 hover:scale-105'
//               style={{
//                 width: `${60 + Math.random() * 20}%`,
//                 height: `${60 + Math.random() * 20}%`,
//                 top: `${Math.random() * 40}%`,
//                 left: `${Math.random() * 40}%`,
//                 transform: `rotate(${Math.random() * 20 - 10}deg)`,
//                 zIndex: index,
//               }}>
//               <img
//                 src={image}
//                 alt={`Playlist image ${index + 1}`}
//                 className='object-cover w-full h-full'
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaylistTile;

// const PlaylistTile = ({ images }) => {
//   // Ensure we have exactly 4 images
//   const safeImages = images.slice(0, 4);
//   while (safeImages.length < 4) {
//     safeImages.push('/api/placeholder/100/100'); // Placeholder for missing images
//   }

//   return (
//     <div className='relative w-40 h-40 overflow-hidden rounded-lg shadow-lg'>
//       <div className='absolute inset-0'>
//         <div className='relative w-full h-full'>
//           {safeImages.map((image, index) => (
//             <div
//               key={index}
//               className='absolute overflow-hidden transition-all duration-300 rounded shadow-md hover:z-20 hover:scale-105'
//               style={{
//                 width: `${getSize(index)}%`,
//                 height: `${getSize(index)}%`,
//                 top: getPosition(index, 'top'),
//                 left: getPosition(index, 'left'),
//                 zIndex: index + 10,
//               }}>
//               <img
//                 src={image}
//                 alt={`Playlist image ${index + 1}`}
//                 className='object-cover w-full h-full'
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* <div className='absolute bottom-0 left-0 right-0 z-30 p-3 bg-opacity-80 backdrop-blur-sm'>
//         <div className='flex items-center'>
//           <LuMusic className='w-5 h-5 mr-2 text-indigo-600' />
//           <h3 className='text-lg font-semibold text-gray-800 truncate'>Playlist Name</h3>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// const getSize = (index: any) => {
//   const sizes = [70, 60, 50, 45];
//   return sizes[index];
// };

// const getPosition = (index, axis) => {
//   const positions = [
//     { top: '5%', left: '5%' },
//     { top: '5%', left: '35%' },
//     { top: '50%', left: '10%' },
//     { top: '50%', left: '50%' },
//   ];
//   return positions[index][axis];
// };

// export default PlaylistTile;
