import { Grid2 } from '@mui/material'
import React from 'react'
import ActivityList from './ActivityList'


// type Props = {
//     activities: Activity[];
//     // 아래는 함수타입지정방식 인자/리턴값
//     selectActivity: (id: string) => void;
//     cancelSelectActivity: () => void;

//     selectedActivity?: Activity;
//     // 위는 이 뜻과 같음 selectedActivity: Activity | undefined;

//     openForm: (id: string) => void;
//     closeForm: () => void;
//     editMode: boolean;
//     // submitForm: (activity: Activity) => void;
//     // deleteActivity: (id: string) => void;
// }

export default function ActivityDashboard() {
    
    
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList />
            </Grid2>

            <Grid2 size={5}>
              Activity filters go here
            </Grid2>
        </Grid2>
    )
}
