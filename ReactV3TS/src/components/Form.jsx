    import { useEffect } from "react";
import { useForm } from "react-Hook-Form";
import { createMember, updateMember } from "../api/membersApi";
import { useMemberDispatch } from "../contexts/MemberContext";

const Form = ({ selectedMember, clearSelection }) => {


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { onCreate, onUpdate } = useMemberDispatch();

    useEffect(() => {
        if (selectedMember) {
            reset(selectedMember);
        } else {
            reset({ name: "", phone: "", birth: "" })
        }
    }, [selectedMember, reset])

    const onSubmit = async (data) => {
        try {
            if (data.id) {
                const updateData = await updateMember(data.id, data);
                onUpdate(updateData);
                alert(`${updateData.name} 업데이트 완료`);
            } else {
                const created = await createMember(data);
                onCreate(created);
                alert(`${created.name}님 등록 완료`);
            }
            reset();
            if (clearSelection) clearSelection();
        } catch (err) {
            const userName = data ? data.name : "사용자";
            alert(`${userName}님 등록 실패:${err.message}`);
        }
    }

    return (
        <div>
            <form className="bg-white p-6 rounded-xl shadow-md border border-gray-100" onSubmit={handleSubmit(onSubmit)}>
                <h3>회원정보</h3>
                <div className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all">
                    <label htmlFor="name">이름:</label>
                    <input
                        {...register("name", {
                            required: "이름은 필수 입력값입니다.",
                            minLength: {
                                value: 2,
                                message: "2자 이상 입력해주세요"
                            }
                        })} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all">
                    <label htmlFor="phone">연락처:</label>
                    <input
                        {...register("phone", {
                            required: "연락처를 입력해주세요",
                            pattern: {
                                value: /^\d{3}-\d{3,4}-\d{4}$/,
                                message: "형식이 잘못되었습니다."
                            }
                        })}
                        placeholder="010-0000-0000"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all">
                    <label htmlFor="birth">생년월일:</label>
                    <input
                        type="date"
                        {...register("birth", {
                            required: "생년월일을 입력해주세요",
                        })}
                    />
                    {errors.birth && <p className="text-red-500 text-xs mt-1">{errors.birth.message}</p>}
                </div>
                <button className="w-full py-3 mt-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 active:scale-95 transition-transform" type="submit">제출</button>

            </form>
        </div>
    )
}
export default Form;