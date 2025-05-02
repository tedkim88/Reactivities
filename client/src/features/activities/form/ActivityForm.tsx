import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { FormEvent } from 'react'
import { useActivities } from '../../../lib/hooks/useActivities';

type Props = {
    activity?: Activity;
    closeForm: () => void;
    // submitForm: (activity: Activity) => void;

}

export default function ActivityForm({ activity, closeForm }: Props) {
    const { updateActivity, createActivity } = useActivities();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data: { [key: string]: FormDataEntryValue } = {}
        formData.forEach((value, key) => {
            data[key] = value;
            //각텍스트필드마다 name attribute이 설정되어있어야함 그게 key로연동되어있음.
        });
        console.log(data);


        if (activity) {
            data.id = activity.id;
            //여기서이제 put메소드를 통해서 api컨트롤러로 처리요청함..

            await updateActivity.mutateAsync(data as unknown as Activity);

            closeForm();
        }
        else {

            //왜 여기 id안주지? CreateActivity할때..form데이터로 전달하는것같은데 근데 form에는id가없을텐데..?
            //Domain쪽 보면..Id널일때 Guid로 자동설정되게 해놨음. 

            await createActivity.mutateAsync(data as unknown as Activity);
            closeForm();
        }

    }
    // submitForm(data as unknown as Activity);


    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }} >
            <Typography variant="h5" gutterBottom color="primary">
                Create activity
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
                {/* <TextField label='Title' value={activity?.title ?? ''} /> */}
                <TextField name='title' label='Title' defaultValue={activity?.title} />
                <TextField name='description' label='Description' defaultValue={activity?.description} multiline rows={3} />
                <TextField name='category' label='Category' defaultValue={activity?.category} />

                <TextField name='date' label='Date' type="date"
                    defaultValue={activity?.date ?
                        new Date(activity.date).toISOString().split('T')[0] :
                        new Date().toISOString().split('T')[0]
                    }
                />
                {/* activity.date.substring(0, 10) : ''}  */}
                <TextField name='city' label='City' defaultValue={activity?.city} />
                <TextField name='venue' label='Venue' defaultValue={activity?.venue} />
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button onClick={closeForm} color='inherit'>Cancel</Button>
                    <Button
                        type='submit'
                        color='success'
                        variant="contained"
                        disabled={updateActivity.isPending || createActivity.isPending}
                    >Submit</Button>
                </Box>

            </Box>
        </Paper>
    )
}
