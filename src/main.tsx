import { LazyMotion, domAnimation } from 'framer-motion';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from '~router/router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LazyMotion features={domAnimation}>
      <RouterProvider router={router} />
    </LazyMotion>
  </React.StrictMode>
);

/* 
<BrowserRouter basename='/'>
  <div className='w-full bg-background text-text-primary'>
    <div className='relative flex-grow overflow-hidden view-transition-container'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/library' element={<Library />} />
      </Routes>
    </div>
  </div>
  <BottomNavContainer />
</BrowserRouter>   
*/
