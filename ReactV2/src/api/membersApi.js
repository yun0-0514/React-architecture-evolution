import {mockData} from "../constants/mockData.js"; 

export const fetchMembers= () =>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(!mockData){
                reject(new Error("MockData가 null입니다."));
            }else{
                resolve(mockData);
            }
        },1500);
    });
};
//만약 받아온 mockData가 null이라면 에러를 발생시키도록 설정!!
//1. Promise를 반환하는 fetchMembers 함수 생성
//2. setTimeout을 사용하여 1.5초 후에 mockData를 반환하거나 에러를 발생시키도록 설정
