import {useState,useEffect} from 'react';
import {fetchMembers} from '../API/membersApi';

const useFetchMembers = () => {

    const [data,setData]=useState([]);//typescript를 대비한 초기 값 설정
    const [isLoading,setIsLoading]=useState(true);
    const [error,setError]=useState("");

    useEffect(()=>{
        const fetchData = async()=>{

                try{
                    const result = await fetchMembers();
                    setData(result)
                }catch(err){
                    setError(err.message);
                }finally{
                    setIsLoading(false);
                }
        }
    fetchData();
    },[])//현제는 url이 없으므로 의존성 배열은 빈 배열로 두는 것이 맞다면 
    return{ data, isLoading, error}
};
export default useFetchMembers;