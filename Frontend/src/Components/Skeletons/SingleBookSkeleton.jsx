import { PageChanger } from "../PageChanger/PageChanger";

const SingleBookSkeleton = () => {
  return (
    <PageChanger>
      <div className="px-4 py-6 md:py-14 fit-width dark:bg-black dark:text-white">
        <div className="flex flex-col gap-7 md:flex-row justify-between md:items-start">
          {/* this below div is used as book image skeleton */}
          <div className="bg-slate-500 h-96 w-11/12 mx-auto max-w-[320px] md:basis-1/2 md:h-[26rem] md:max-w-[400px] md:mx-0 animate-pulse"></div>
          {/* book details skeleton */}
          <div className="md:basis-1/2">
            <div className="text-skeleton w-28"></div>
            <div className="text-skeleton mt-3 w-24"></div>
            <div className="text-skeleton mt-4 w-16"></div>
            <div className="text-skeleton mt-3 w-16"></div>
            <div className="text-skeleton mt-6 w-full"></div>
            <div className="text-skeleton mt-3 w-full"></div>
            <div className="text-skeleton mt-3 w-full"></div>
            <div className="text-skeleton mt-3 w-full"></div>
            <div className="text-skeleton mt-3 w-full"></div>
            <div className="text-skeleton mt-3 w-full"></div>
            <div className="text-skeleton mt-6 w-28"></div>
            <div className="text-skeleton mt-3 w-32"></div>
            <div className="text-skeleton w-20 h-7 mt-6"></div>
          </div>
        </div>
      </div>
    </PageChanger>
  );
};

export default SingleBookSkeleton;
