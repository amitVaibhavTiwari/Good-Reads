import { FaStar, FaUserFriends } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
const data = [
  {
    icon: <IoSearchOutline />,
    title: "Book Discovery",
    desc: "Discover new books to read based on your interests, reading history, and recommendations of other users.",
  },
  {
    icon: <FaUserFriends />,
    title: "Friends and Community",
    desc: "You can connect with your friends, family menbers, and other people who share your love of reading.",
  },
  {
    icon: <FaStar />,
    title: "Book Reviews",
    desc: "You can write reviews of books you have read and share your thoughts with other goodreads users.",
  },
];

const CardSection = () => {
  return (
    <div className="px-4 py-8 bg-white md:py-14 lg:py-16 fit-width">
      <h1 className="text-2xl font-semibold md:w-7/12 lg:text-4xl lg:leading-[2.7rem]">
        The best way to manage your reading life.
      </h1>
      <p className="mt-2 text-[.95rem] md:w-1/2 lg:text-lg lg:mt-3">
        Keep track of what you are reading, set reading goals and connect with
        friends to share your book reviews.
      </p>
      <div className="mt-6 flex flex-col items-center gap-1 md:flex-row md:mt-14 md:justify-between">
        {data.map((card) => {
          return (
            <div
              className="flex flex-col items-center p-4 text-center gap-1"
              key={card.title}
            >
              <div className="text-2xl">{card.icon}</div>
              <h2 className="text-lg font-semibold">{card.title}</h2>
              <p className="text-md lg:text-lg">{card.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardSection;
