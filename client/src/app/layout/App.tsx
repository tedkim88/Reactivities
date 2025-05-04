import { Box, Container, CssBaseline } from "@mui/material";
// import { useEffect, useState } from "react";
import NavBar from "./NavBar";

import { Outlet } from "react-router";


function App() {
  // const [activities, setActivities] = useState<Activity[]>([]);


  // const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  // const [editMode, setEditMode] = useState(false);



  // useEffect(() => {

  //   // fetch('https://localhost:5001/api/activities')
  //   //   .then(response => response.json())
  //   //   .then(data => setActivities(data))

  //   axios.get<Activity[]>('https://localhost:5001/api/activities')
  //     // .then(response => response.json())
  //     //json파싱 알아서해줌. .data로바로접근.
  //     .then(response => setActivities(response.data))

  //   return () => { }
  // }, [])


  // const handleSelectActivity = (id: string) => {
  //   setSelectedActivity(activities!.find(x => x.id === id));
  // }

  // const handleCancelSelectActivity = () => {
  //   setSelectedActivity(undefined);
  // }

  // //이렇게 함수를지정하면 이걸 어디서콜하든..콜할때 id를 주고 콜할수도있고 id없이 무변수로 콜할수도있음.
  // //그에따라 결과는 당연히달라짐..여기는 함수를 정의하는 부분이고 콜하는쪽에서 어떻게지정하냐에 따라 반응을 달리할 수 있음.
  // const handleOpenForm = (id?: string) => {
  //   if (id) handleSelectActivity(id);
  //   else handleCancelSelectActivity();
  //   setEditMode(true);
  // }

  // const handleFormClose = () => {
  //   setEditMode(false);
  // }



  // const handleSubmitForm = (activity: Activity) => {
  //   //이게 edit할때쓰던방식... map으로 하나하나.근데 내가전달한update된 activity로 교체id가 일치할 시에
  //   // if (activity.id) {
  //   //   setActivities(activities.map(x => x.id === activity.id ? activity : x))
  //   // }
  //   // else {
  //   //   const newActivity = { ...activity, id: activities.length.toString() };
  //   //   setSelectedActivity(newActivity);
  //   //   setActivities([...activities, newActivity]);
  //   // }
  //   console.log(activity);
  //   setEditMode(false);
  // }



  // const handleDelete = (id: string) => {
  //   console.log(id);
  //   // setActivities(activities.filter(x => x.id !== id));
  // }




  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
      <Outlet />
        {/* 아웃렛은..자식컴포넌트의 루트를향하는 클릭(혹은접속)이 이루어졌을때 그 자식컴포넌트가 렌더링될 물리적 위치를 지정하는 것<div className="
        여기에 렌더링시켜라!이렇게/}
        
        {/* <ActivityDashboard
        //이 밑에 라우팅하면서 싹다지움
        // activities={activities}
        // selectActivity={handleSelectActivity}
        // cancelSelectActivity={handleCancelSelectActivity}
        // selectedActivity={selectedActivity}
        // editMode={editMode}
        // openForm={handleOpenForm}
        // closeForm={handleFormClose}

        // submitForm={handleSubmitForm}
        // deleteActivity={handleDelete}
        /> */}
      </Container>
    </Box>
  )
}

export default App
