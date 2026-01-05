import { SearchBarProps } from "../types/components.types";
import { useSearchHandlers } from "../hooks/useSearchHandlers";

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const { keyword, filterType, handleFilterChange, handleKeywordCahnge } =
    useSearchHandlers(onSearch);

  return (
    <div className="py-10 px-4">
      {/* 폼 전체 래퍼 */}
      <div className="flex items-center w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-shadow p-1.5">
        {/* 카테고리 선택부 */}
        <select
          value={filterType}
          onChange={handleFilterChange}
          className="bg-transparent pl-6 pr-2 py-2 text-sm font-medium text-gray-700 outline-none cursor-pointer border-r border-gray-200 mr-2"
        >
          <option value="name">상품명</option>
          <option value="company">회사</option>
          <option value="category">카테고리</option>
        </select>

        {/* 입력창 */}
        <input
          value={keyword}
          onChange={handleKeywordCahnge}
          type="text"
          placeholder="어떤 상품을 찾으시나요?"
          className="flex-1 bg-transparent px-4 py-2 text-gray-800 outline-none placeholder:text-gray-400"
        />

        {/* 검색 버튼 */}
      </div>
    </div>
  );
};

export default SearchBar;
