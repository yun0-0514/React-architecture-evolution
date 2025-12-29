import { useState } from "react";
import { useMemberInfo } from "../hooks/useMemberState.js";
import styles from './home.module.scss';
import Form from "../components/Form.jsx";
import InfoCard from "../components/Infocard.jsx";
const Home = () => {

    const [selectedMember, setSelectedMember] = useState(null);
    const clearSelection = () => setSelectedMember(null);

    const { data, isLoading } = useMemberInfo();
    if (isLoading) { return <div className="flex justify-center items-center bg-red-500">로딩 중...</div>; }
    else {
        return (
            <div className={styles.container}>
                <section className={styles.listSection}>
                    <h3>회원 목록</h3>
                    <div className={styles.cardList}>
                        {data.map((member) => (
                            <InfoCard key={member.id} data={member}
                                onEdit={() => setSelectedMember(member)} />
                        ))}
                    </div>
                </section>
                <section className={styles.formSection}>
                    <Form
                        selectedMember={selectedMember}
                        clearSelection={clearSelection} />
                </section>
            </div>
        );
    }

};
export default Home;