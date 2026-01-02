import { useForm, SubmitHandler } from "react-hook-form";
import { SearchBarProps } from "../types/components.types";
import { ProductSearchCondition } from "../types/product.type";
const SearchBar = ({ onSearch }: SearchBarProps) => {
  const { register, handleSubmit } = useForm<ProductSearchCondition>({
    defaultValues: {
      filterType: "name",
      keyword: "",
    },
  });

  const onSubmit: SubmitHandler<ProductSearchCondition> = (data) => {
    onSearch(data);
  };

  return (
    <div className="py-10 px-4">
      {/* 폼 전체 래퍼 */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-shadow p-1.5"
      >
        {/* 카테고리 선택부 */}
        <select
          {...register("filterType")}
          className="bg-transparent pl-6 pr-2 py-2 text-sm font-medium text-gray-700 outline-none cursor-pointer border-r border-gray-200 mr-2"
        >
          <option value="name">상품명</option>
          <option value="company">회사</option>
          <option value="category">카테고리</option>
        </select>

        {/* 입력창 */}
        <input
          {...register("keyword")}
          type="text"
          placeholder="어떤 상품을 찾으시나요?"
          className="flex-1 bg-transparent px-4 py-2 text-gray-800 outline-none placeholder:text-gray-400"
        />

        {/* 검색 버튼 */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-colors duration-200 shadow-sm"
        >
          검색
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
