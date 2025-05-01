import { Grid2 } from '@mui/material'
import React from 'react'
import ActivityList from './ActivityList'
import ActivityDetail from '../details/ActivityDetail'
import ActivityForm from '../form/ActivityForm'

type Props = {
    activities: Activity[];
    // 아래는 함수타입지정방식 인자/리턴값
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;

    selectedActivity?: Activity;
    // 위는 이 뜻과 같음 selectedActivity: Activity | undefined;

    openForm: (id: string) => void;
    closeForm: () => void;
    editMode: boolean;
    submitForm: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({ activities, selectActivity,
    cancelSelectActivity,
    selectedActivity,
    openForm,
    closeForm,
    editMode,
    submitForm,
    deleteActivity }: Props) {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList 
                    activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity} 
                    />
            </Grid2>

            <Grid2 size={5}>
                {selectedActivity && !editMode &&
                    <ActivityDetail
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />}
                {editMode &&
                    <ActivityForm closeForm={closeForm}
                        activity={selectedActivity}
                        submitForm={submitForm} />}
            </Grid2>
        </Grid2>
    )
}
