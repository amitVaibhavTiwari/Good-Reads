// Loading skeleton when all books are loading on all books page
const arr = new Array(16);
const AllBooksSkeleton = () => {
  return (
    <div className=" place-items-center grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
      {[...arr].map((e, i) => {
        return (
          <div
            key={i}
            className="h-32 md:h-44 lg:h-56 bg-slate-300 rounded-2xl w-full animate-pulse"
          ></div>
        );
      })}
    </div>
  );
};

export default AllBooksSkeleton;
