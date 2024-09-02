import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { domAnimation, LazyMotion } from 'framer-motion';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { mediaActions } from '~helper/mediaActions';
import PWABadge from '~PWABadge';
import Router from '~router/Router';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 3,
    },
  },
});

mediaActions.restoreMediaState();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <BrowserRouter> */}
      <LazyMotion features={domAnimation}>
        <Router />
        <PWABadge />
      </LazyMotion>
      {/* </BrowserRouter> */}
      {/* <ReactQueryDevtools initialIsOpen /> */}
    </QueryClientProvider>
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
