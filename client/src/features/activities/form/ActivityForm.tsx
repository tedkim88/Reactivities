import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { FormEvent } from 'react'
import { useActivities } from '../../../lib/hooks/useActivities';
import { useNavigate, useParams } from 'react-router';



export default function ActivityForm() {
    const { id } = useParams();
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
    const navigate = useNavigate();


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
            navigate(`/activities/${activity.id}`)
            // closeForm();
        }
        else {

            //왜 여기 id안주지? CreateActivity할때..form데이터로 전달하는것같은데 근데 form에는id가없을텐데..?
            //Domain쪽 보면..Id널일때 Guid로 자동설정되게 해놨음. 

            await createActivity.mutate(data as unknown as Activity, {
                //여기서 이 id가 왜? 새로발급받은id가되는거지?
                //여기서 아래쓰이는id는 위에 edit페이지용의 id와 아예다른변수임 콜백함수로 넣은 것임.
                //mutationFN의 리턴값이 onsuccess의 인자로 들어가도록 셋팅되어있음 리액트쿼리함수자체가...외워야함
                //아래 id는 변수명을asd 이런식으로 바꿔서 해도 작동함. 즉 위의 edit페이지 param에서 얻은 ID랑 전혀상관없음.
                //이 onsuccess랑 기존에 hook페이지에서 정의됐던 onsuccess는 둘다 실행되는듯보임 콘솔로그 찍어봤을때 기존정의된게 먼저찍히고 , 여기서 넣은 콘솔이 두번째로 찍힘. 
                onSuccess: (id) => {
                    console.log('this is callback onsuccess')
                    navigate(`/activities/${id}`)
                }

            });

        }

    }
    // submitForm(data as unknown as Activity);

    if (isLoadingActivity) return <Typography>Loading activity...</Typography>

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }} >
            <Typography variant="h5" gutterBottom color="primary">
               {/* {id == null ? 'Create activity' : 'Edit activity'}  */}
               {/* 위에껀내방식 둘다잘작동함 */}
               {activity ? 'Edit activity' : 'Create activity'} 
               {/* 아래껀 Neil방식 */}
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
                    <Button color='inherit'>Cancel</Button>
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
