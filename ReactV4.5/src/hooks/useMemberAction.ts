import { deleteMember } from "../api/MembersApi";
import { useMemberDispatch } from "../contexts/MemberContext";

export const useMemberAction = () => {
  const { onDelete } = useMemberDispatch();

  const handleDelete = async (id: string | number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }
    try {
      const result = await deleteMember(id);
      if (result.error) throw result.error;
      onDelete(id);
      alert(`${id} 삭제 성공`);
    } catch (error) {
      alert(`${id}삭제 실패:${(error as Error).message}`);
    }
  };
  return { handleDelete };
};
