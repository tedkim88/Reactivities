import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import agent from "../api/agent";

export const useActivities = () => {

    const queryClient = useQueryClient();

    //data로 그냥써도되는데 구조분해할당하면서 activities로 이름바꾼거는
    //useEffect /use State썼을때 썼던 변수명인 activities가 이미 밑에서 쓰이고있기 때문에 그걸 다바꾸기 너무
    //힘드니까 data: activities라고 이렇게 닉네임 정해서 쓴듯...바로 data를 써먹을수있게하려고.
   
   //get메소드..전부다 컨트롤러쪽으로 향하게됨.API 컨트롤러쪽 메서드와연동되어있음.
    const { data: activities, isPending } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            // const response = await axios.get<Activity[]>('https://localhost:5001/api/activities');
            const response = await agent.get<Activity[]>('/activities');
            return response.data;
        }
    })


    //얘는 updateActivity(수정할객체)를 넣는순간 mutationFn이 발동되면서 아래 put에 지정한경로/activities(여기에 API put메소드 컨트롤러위치함)
    //거기로 요청을보냄..거기서부터는 백엔드가 알아서 하는 것..이 useActivities훅을 사용하기전에는 get / put이런요청안보내고 그냥
    //상태관리만 하면서 놀았기 때문에 서버에는 실제 변동사항이 적용안됐었음...여기서부터 제대로 연동하는 것. 
    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put('/activities', activity);
            
        },
        //위에 put메서드가 성공적인 response를 받았을때 onsuccess가발동하면서
        //activities 라는 쿼리키 데이터를 invalidate캐싱무효화시켜서 다시 서버로부터 데이터 받아서 리렌더하게만듦.
        
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    })

    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.post('/activities', activity);
            
        },
       
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    })

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/activities/${id}`);
            
        },
       
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    })

    return {
        createActivity,
        activities,
        isPending,
        updateActivity,
        deleteActivity
    }

}