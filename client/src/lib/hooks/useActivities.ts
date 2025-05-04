import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import agent from "../api/agent";

export const useActivities = (id?: string) => {

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

    //useQuery든..useMutation이든뭐든간에 그 함수에 '객체'를 인자로넣음. 그 함수는 그럼 본인 정의된 안쪽에서 그 객체인자를 갖고
    //이리저리 작업해서 리턴하겠지. 그 리턴하는 객체들을 모아서 저~~밑쪽코드에서 return객체형태로 묶어서 보내는 것임. 
    //그것을 구조분해할당으로 필요할 때 받아서 쓰는거고.
    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey: ['activities', id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        enabled: !!id
        //이 쿼리는 useActivities훅에 id를 집어넣었을때만 실행하도록 하기위함임.
        // enabled는 이 useQuery실행 '조건'을 넣는 곳이고 !!id는  id가 truty일때를 얘기함 강제로 bool타입으로 전환. 
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
         const response = await agent.post('/activities', activity);
         //이게 API컨트롤러에 post메서드쪽으로.요청을 보냄..거기서 지정한 리턴값이 response로저장됨..
         //그 response는 .data 키에서 추출가능 API쪽살펴보면 ID리턴하도록 셋팅해놨음
         return response.data;
        },

        onSuccess: async () => {
            console.log('heyhey')
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
        deleteActivity,
        activity,
        isLoadingActivity
    }

}