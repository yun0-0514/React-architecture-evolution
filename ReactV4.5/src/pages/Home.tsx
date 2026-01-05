import { useState } from "react";
import { useMemberInfo } from "../hooks/useMemberState";
import styles from "./Home.module.scss";
import Form from "../components/Form";
import InfoCard from "../components/Infocard";
import { Member } from "@/types/member.types";
const Home = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const clearSelection = () => setSelectedMember(null);

  const { members, isLoading } = useMemberInfo();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-red-500">
        로딩 중...
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <section className={styles.listSection}>
          <h3>회원 목록</h3>
          <div className={styles.cardList}>
            {members.map((member) => (
              <InfoCard
                key={member.id}
                data={member}
                onEdit={() => setSelectedMember(member)}
              />
            ))}
          </div>
        </section>
        <section className={styles.formSection}>
          <Form
            selectedMember={selectedMember}
            clearSelection={clearSelection}
          />
        </section>
      </div>
    );
  }
};
export default Home;
