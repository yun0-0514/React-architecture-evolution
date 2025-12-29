import { deleteMember } from "../api/membersApi";
import { useMemberDispatch } from "../contexts/MemberContext";

const InfoCard = ({ data, onEdit }) => {
    const { onDelete } = useMemberDispatch();

    const handleDelete = async () => {
        try {
            if (!window.confirm("정말 삭제하시겠습니까?")) return;
            await deleteMember(data.id);
            onDelete(data.id);
            alert("삭제되었습니다.");
        } catch (error) {
            alert(`삭제 실패 ${error.message}`);
        }
    }
    return (
        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-gray-800">이름: {data.name}</h3>
            <p className="text-lg font-bold text-gray-800">연락처: {data.phone}</p>
            <p className="text-lg font-bold text-gray-800">생년월일: {new Date(data.birth).toLocaleDateString()}</p>
            <button className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors" onClick={handleDelete}>삭제</button>
            <button className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors" onClick={() => onEdit(data)}>수정</button>
        </div>
    );
}
export default InfoCard;