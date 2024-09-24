import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import GetAllMessages from "./pages/GetAllMessages/GetAllMessages";
import PostNewMessage from "./pages/PostNewMessage/PostNewMessage";

const router = createBrowserRouter([

    {

path: "/",
element: <App />,
errorElement: <div>404 Not Found</div>,
children: [
    { path: "/", element: <GetAllMessages />, index: true },
    { path: "/post", element: <PostNewMessage /> }
]
},
]);

export default router;
