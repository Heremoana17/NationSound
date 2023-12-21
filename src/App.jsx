import axios from "axios"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Pages/Home";
import PageError from "./Pages/PageError";
import Page1 from "./Pages/Page1";
import Page2 from "./Pages/Page2";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <PageError/>,
    loader: () => 
      axios
        .get('https://pixelevent.site/api/views/1')
        .then(res => res.data),
  },
  {
    path: '/billetterie',
    element: <Page1 billetterie={true} about={false}/>,
    errorElement: <PageError/>,
    loader: () => 
      axios
        .get('https://pixelevent.site/api/views/2')
        .then(res => res.data),
  },
  {
    path: '/programme',
    element: <Page1 billetterie={false} about={false} programme={true}/>,
    errorElement: <PageError/>,
    loader: () => 
      axios
        .get('https://pixelevent.site/api/views/3')
        .then(res => res.data),
  },
  {
    path: '/artiste',
    element: <Page1 billetterie={false} about={false} programme={false} artiste={true}/>,
    errorElement: <PageError/>,
    loader: () => 
      axios
        .get('https://pixelevent.site/api/artistes')
        .then(res => res.data),
  },
  {
    path: '/actualite',
    element: <Page1 billetterie={false} about={false} programme={false} actualite={true}/>,
    errorElement: <PageError/>,
    loader: () => 
      axios
        .get('https://pixelevent.site/api/views/4')
        .then(res => res.data),
  },
  {
    path: '/sponsor',
    element: <Page1 billetterie={false} about={false} programme={false} actualite={false} sponsor={true}/>,
    errorElement: <PageError/>,
    loader: () => 
      axios
        .get('https://pixelevent.site/api/views/5')
        .then(res => res.data),
  },
  {
    path: '/about',
    element: <Page1 billetterie={false} about={true}/>,
    errorElement: <PageError/>,
    loader: () => 
      axios
        .get('https://pixelevent.site/api/views/6')
        .then(res => res.data),
  },
  {
    path: '/map',
    element: <Page1 billetterie={false} about={false} programme={false} actualite={false} sponsor={false} map={true}/>,
    errorElement: <PageError/>,
  },
  {
    path: '/artiste/:id',
    element: <Page2 artiste={true}/>,
    errorElement: <PageError/>,
  },
  {
    path: '/article/:id',
    element: <Page2 article={true}/>,
    errorElement: <PageError/>,
  },
  {
    path: '/article/wp/:id',
    element: <Page2 articlewp={true}/>,
    errorElement: <PageError/>,
  },
  {
    path: '/episode/:id',
    element: <Page2 episode={true}/>,
    errorElement: <PageError/>,
  },
  {
    path: '/lieu/:id',
    element: <Page2 lieu={true}/>,
    errorElement: <PageError/>,
  },
  
])
function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
