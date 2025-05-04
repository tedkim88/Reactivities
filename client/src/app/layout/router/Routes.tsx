import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../../../features/home/HomePage";
import ActivityDashboard from "../../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../../features/activities/form/ActivityForm";
import ActivityDetail from "../../../features/activities/details/ActivityDetail";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'activities/:id', element: <ActivityDetail /> },
            //여기서 액티비티폼이 동일하다고 착각하여 manage쪽에서 creatactivity쪽루트타도 컴포넌트 체인지가 안되는 경우가생김 manage쪽activity폼에남아있음.그래서 key를 줌으로써 key가바뀌면 아예 리렌더링
            //되는특징활용하여 리렌더링
            { path: 'createActivity', element: <ActivityForm key='create'/> },
            { path: 'manage/:id', element: <ActivityForm /> }
        ]
    },

]);
