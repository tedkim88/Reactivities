import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import { useActivities } from '../../../lib/hooks/useActivities';



export default function ActivityDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  //이 routes.tsx에 :id라고 지정했던 스펠링 그대로 여기서 받아야함.
  //useParams는 route정보에있는 :이하 부분을 변수로 갖고오는 것인듯.

  const { activity, isLoadingActivity } = useActivities(id)

  if (isLoadingActivity) return <Typography>Loading...</Typography>
  if (!activity) return <Typography>Activity not found...</Typography>

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia component='img' src={`/images/categoryImages/${activity.category}.jpg`} />
      <CardContent>
        <Typography variant='h5'>{activity.title}</Typography>
        <Typography variant='subtitle1' fontWeight='light'>{activity.date}</Typography>
        <Typography variant='body1'>{activity.description}</Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/manage/${activity.id}`} color='primary'>Edit</Button>
        <Button onClick={() => navigate('/activities')} color='inherit'>Cancel</Button>
        {/* 이게 온클릭했을때 이함수를 실행해라는뜻임. 주의 여기서 cancelSelectActivity()를 해버리면
        그건 param없는 이 함수를일단실행시키고 그 '리턴'값을 onclick에서 실행시키라는..이상한 뜻이 되버림.문법주의 */}
      </CardActions>
    </Card>

  )
}
