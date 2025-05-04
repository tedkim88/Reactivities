import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/styles.css'
// import App from './app/layout/App.tsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { router } from './app/layout/router/Routes.tsx';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* react-query를 APP이하 컴포넌트에서 전부쓰기위해 감싸는중 */}
    <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools/>
    <RouterProvider router={router} />
    {/* <App /> */}
    {/* App/컴포넌트대신 라우트를 제공해서 App/컴포넌트로 이어지게... */}
    </QueryClientProvider>    
  </StrictMode>,
)
