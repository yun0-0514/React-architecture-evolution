export const ProductSkeleton = () => {
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-3 w-full animate-pulse">
      <div className="aspect-square bg-gray-200 runded-xl mb-3"></div>
      <div className="w-12 h-4 bg-gray-200 rounded-full mb-2"></div>
      <div className="w-4/5 h-5 bg-gray-200 rounded mb-2"></div>
      <div className="w-2/3 h-5 bg-gray-200 rounded mb-2"></div>
      <div className="w-1/2 h-6 bg-gray-200 rounded mt-2"></div>
    </div>
  );
};
