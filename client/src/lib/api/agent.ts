import axios from "axios";

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })

}

//이거 고정키임..baseURL같은거
const agent = axios.create({
    // baseURL: 'https://localhost:5001/api'
    //하드코딩하지않고... 루트폴더 .env.development에 정의해둔 환경변수..끌어다씀..특이하네..
    baseURL: import.meta.env.VITE_API_URL
});

//이렇게 agent인터셉터걸어놓으면 굳이export안해도 agent가 response받을때 자동으로인터셉터실행된다는듯
agent.interceptors.response.use(async response => {
    try {
        //서버에서 응답이나오면 그걸 가로챔..클라이언트에쏘기전에.
    //이건 가로채서 activities리턴 조금늦춰서.. Loading..화면띄우는 실험용도
        await sleep(1000);
        return response;
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error)
    }

})

export default agent;