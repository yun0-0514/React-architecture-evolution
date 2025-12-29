import { useMemberState } from "../hooks/useMemberState";

const Home = () => {

    const { data, isLoading } = useMemberState();


    if (isLoading) {
        return <div>로딩중..</div>
    } else {
        return (
            <div>
                <h3>회원정보</h3>
                <hr />
                {data.map((item) => (
                    <div key={item.id}>
                        <h3>이름:{item.name}</h3>
                        <p>연락처:{item.phone}</p>
                        <p>생년월일:{item.birth.toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        );
    };
};
export default Home;