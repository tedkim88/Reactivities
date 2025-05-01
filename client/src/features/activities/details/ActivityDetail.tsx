import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

type Props = {
  activity: Activity
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
}

export default function ActivityDetail({ activity, cancelSelectActivity, openForm }: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia component='img' src={`/images/categoryImages/${activity.category}.jpg`} />
      <CardContent>
        <Typography variant='h5'>{activity.title}</Typography>
        <Typography variant='subtitle1' fontWeight='light'>{activity.date}</Typography>
        <Typography variant='body1'>{activity.description}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => openForm(activity.id)} color='primary'>Edit</Button>
        <Button onClick={cancelSelectActivity} color='inherit'>Cancel</Button>
        {/* 이게 온클릭했을때 이함수를 실행해라는뜻임. 주의 여기서 cancelSelectActivity()를 해버리면
        그건 param없는 이 함수를일단실행시키고 그 '리턴'값을 onclick에서 실행시키라는..이상한 뜻이 되버림.문법주의 */}
      </CardActions>
    </Card>

  )
}
