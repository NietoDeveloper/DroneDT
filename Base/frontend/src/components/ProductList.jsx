
  return (
    <div className="flex-1">

      <div className="flex justify-between text-base sm:text-xl lg:text-2xl mb-4">
        <Title title1="ALL" title2="COLLECTIONS" />
        <select
          onChange={sortFilter}
          value={sortType}
          className="border border-gray-300 text-sm px-2 sm:h-[40px]"
        >
          <option value="relevant">Sort by: Relevant</option>
          <option value="high-low">Sort by: High to Low</option>
          <option value="low-high">Sort by: Low to High</option>
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
        {productElements}
      </div>
    </div>
  );
}
