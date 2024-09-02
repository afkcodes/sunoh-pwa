// import { useState } from 'react';

import { dataExtractor } from '~helper/dataExtractor';

// const Header = () => (
//   <header className='mb-4 text-center'>
//     <h1 className='text-[#FF00FF] text-4xl font-bold mb-2 animate-pulse'>
//       Welcome to John's Cyber Space!
//     </h1>
//     <div className='bg-[#FFFF00] p-1 overflow-hidden'>
//       <p className='animate-marquee whitespace-nowrap'>
//         Thanks for visiting my personal website! Under construction... 🚧
//       </p>
//     </div>
//     <img
//       src='https://web.archive.org/web/20091027083711/http://hk.geocities.com/happyha2003/Underconstruction/underconstructinline.GIF'
//       alt='Under Construction'
//       className='max-w-full mx-auto mt-2'
//     />
//   </header>
// );

// const Navigation = () => (
//   <nav className='bg-[#808080] p-2 mb-4 text-center'>
//     <a href='#about' className='text-[#0000FF] mx-2 underline'>
//       About Me
//     </a>
//     <a href='#skills' className='text-[#0000FF] mx-2 underline'>
//       My Skills
//     </a>
//     <a href='#projects' className='text-[#0000FF] mx-2 underline'>
//       Cool Projects
//     </a>
//     <a href='#guestbook' className='text-[#0000FF] mx-2 underline'>
//       Guestbook
//     </a>
//   </nav>
// );

// const About = () => (
//   <section id='about' className='mb-4'>
//     <h2 className='text-[#008000] text-2xl font-bold border-b-2 border-[#008000] pb-1 mb-2'>
//       About Me
//     </h2>
//     <div className='flex'>
//       <img
//         src='https://web.archive.org/web/20090830091009/http://geocities.com/TimesSquare/Maze/8354/dancing_baby.gif'
//         alt='Dancing Baby'
//         className='mr-4 border-2 border-[#000000]'
//       />
//       <p>
//         Hey there, cybersurfers! I'm John, a rad web developer riding the information
//         superhighway. When I'm not coding up a storm, you can find me battling in Quake or
//         updating my Geocities page.
//       </p>
//     </div>
//   </section>
// );

// const Skills = () => (
//   <section id='skills' className='mb-4'>
//     <h2 className='text-[#008000] text-2xl font-bold border-b-2 border-[#008000] pb-1 mb-2'>
//       My 1337 Skills
//     </h2>
//     <ul className='pl-5 list-disc'>
//       <li>⭐ HTML 4.01</li>
//       <li>⭐ CSS 2</li>
//       <li>⭐ JavaScript</li>
//       <li>⭐ PHP</li>
//       <li>⭐ MySQL</li>
//       <li>⭐ Photoshop 7</li>
//     </ul>
//   </section>
// );

// const Projects = () => (
//   <section id='projects' className='mb-4'>
//     <h2 className='text-[#008000] text-2xl font-bold border-b-2 border-[#008000] pb-1 mb-2'>
//       Cool Projects
//     </h2>
//     <table className='w-full border-collapse border border-[#000000]'>
//       <thead>
//         <tr className='bg-[#808080]'>
//           <th className='border border-[#000000] p-1'>Project</th>
//           <th className='border border-[#000000] p-1'>Description</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td className='border border-[#000000] p-1'>Guestbook 2000</td>
//           <td className='border border-[#000000] p-1'>
//             A PHP-powered guestbook for your site visitors
//           </td>
//         </tr>
//         <tr>
//           <td className='border border-[#000000] p-1'>Y2K Countdown</td>
//           <td className='border border-[#000000] p-1'>
//             Are you ready for the new millennium?
//           </td>
//         </tr>
//         <tr>
//           <td className='border border-[#000000] p-1'>Web Ring Central</td>
//           <td className='border border-[#000000] p-1'>
//             Connect with other cool websites!
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   </section>
// );

// const Guestbook = ({ entries, addEntry }) => {
//   const [guestbookEntry, setGuestbookEntry] = useState('');

//   const handleGuestbookSubmit = (e) => {
//     e.preventDefault();
//     if (guestbookEntry.trim()) {
//       addEntry(guestbookEntry);
//       setGuestbookEntry('');
//     }
//   };

//   return (
//     <section id='guestbook' className='mb-4'>
//       <h2 className='text-[#008000] text-2xl font-bold border-b-2 border-[#008000] pb-1 mb-2'>
//         Sign My Guestbook!
//       </h2>
//       <form onSubmit={handleGuestbookSubmit} className='mb-2'>
//         <input
//           type='text'
//           value={guestbookEntry}
//           onChange={(e) => setGuestbookEntry(e.target.value)}
//           placeholder='Leave your mark!'
//           className='w-3/4 mr-2 p-1 border border-[#000000]'
//         />
//         <button
//           type='submit'
//           className='bg-[#FF00FF] text-white border-2 border-[#FF69B4] p-1 cursor-pointer'>
//           Sign Guestbook
//         </button>
//       </form>
//       <div className='bg-white border border-[#000000] p-2 h-24 overflow-y-scroll'>
//         {entries.map((entry, index) => (
//           <p key={index} className='mb-1'>
//             {entry}
//           </p>
//         ))}
//       </div>
//     </section>
//   );
// };

// const Footer = () => (
//   <footer className='mt-4 text-xs text-center'>
//     <p>© 1999 John Doe | Best viewed in Netscape Navigator 4.0 or higher</p>
//     <div className='flex justify-center mt-2'>
//       <img
//         src='https://web.archive.org/web/20090829232155/http://geocities.com/Hollywood/Studio/6424/netscapelogo.gif'
//         alt='Netscape Now!'
//         className='mr-2'
//       />
//       <img
//         src='https://web.archive.org/web/20091027083924/http://geocities.com/ResearchTriangle/Campus/7908/ie_logo.gif'
//         alt='Get Internet Explorer'
//       />
//     </div>
//     <p className='mt-2'>
//       You are visitor number:
//       <span className='bg-[#FFFFFF] text-[#000000] px-1 border border-[#000000] ml-1'>
//         1337
//       </span>
//     </p>
//     <img
//       src='https://web.archive.org/web/20090810024729/http://www.geocities.com/liberty_link/res/logo/e-mail.gif'
//       alt='Email Me'
//       className='mx-auto mt-2'
//     />
//   </footer>
// );

// const RetroPortfolio = () => {
//   const [guestbookEntries, setGuestbookEntries] = useState([]);

//   const addGuestbookEntry = (entry) => {
//     setGuestbookEntries([...guestbookEntries, entry]);
//   };

//   return (
//     <div className='bg-[#000080] min-h-screen flex justify-center items-start py-4'>
//       <div className="bg-[#C0C0C0] w-[800px] text-black font-['Comic_Sans_MS',_cursive] p-4 border-4 border-[#FFFFFF] shadow-[5px_5px_0_0_rgba(0,0,0,0.6)] relative">
//         <div className='absolute top-0 left-0 w-full h-6 bg-gradient-to-r from-[#000080] via-[#1084d0] to-[#000080] flex items-center px-2'>
//           <div className='w-3 h-3 rounded-full bg-[#FF0000] mr-1'></div>
//           <div className='w-3 h-3 rounded-full bg-[#FFFF00] mr-1'></div>
//           <div className='w-3 h-3 rounded-full bg-[#00FF00]'></div>
//         </div>
//         <div className='mt-6'>
//           <Header />
//           <Navigation />
//           <main>
//             <About />
//             <Skills />
//             <Projects />
//             <Guestbook entries={guestbookEntries} addEntry={addGuestbookEntry} />
//           </main>
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RetroPortfolio;

const val = {
  a: {
    b: [
      {
        n: {
          y: [
            {
              z: 'hari',
            },
          ],
        },
      },
      {
        m: {
          1: [
            {
              z: 'afk',
            },
          ],
        },
      },
    ],
  },
};
const Library = () => {
  const data = dataExtractor(val, 'a.b.1.m.1');
  console.log('====================================');

  console.log('====================================');
  return <div>Library - {JSON.stringify(data)} </div>;
};

export default Library;
// console.log(a?.b?.[0])
