import { FaUserCircle, FaRegSmile, FaTag, FaLock, FaUnlock, FaArrowRight } from "react-icons/fa";
import Loading from "../../../../Component/Loading/Loading";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const LessonCard = () => {

const axiosSecure = useAxiosSecure()


const {
    data: lessons = [],
    isLoading,
    error,
    
  } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons`);
      return res.data;
    },
  });
  console.log(lessons);

  if (isLoading) return <Loading></Loading>;
  if (error) return <p className="text-error">Failed to load lessons</p>;



console.log(lessons);


const currentUser = {
  isPremium: false,
};

  return (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {lessons.map((lesson) => {
        const {
          _id,
          title,
          description, // 👈 use this instead of shortDescription
          category,
          emotionalTone,
          creatorName,
          creatorPhoto,
          accessLevel,
          createdAt,
        } = lesson;

        const isLocked =
          accessLevel === "Premium" && !currentUser.isPremium;

        return (
          <div
            key={_id}
            className="relative rounded-2xl border border-base-200 bg-base-100 shadow-sm hover:shadow-lg transition-all overflow-hidden"
          >
            {/* 🔒 Premium Overlay */}
            {isLocked && (
              <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center text-center px-6">
                <FaLock className="text-3xl text-warning mb-3" />
                <h3 className="font-semibold text-lg">
                  Premium Lesson
                </h3>
                <p className="text-sm text-gray-500">
                  Upgrade to view this lesson
                </p>
              </div>
            )}

            {/* Card Content */}
            <div className={`p-6 space-y-4 ${isLocked ? "blur-sm select-none" : ""}`}>

              {/* Header */}
              <div className="flex justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-primary">
                    {category}
                  </p>
                  <h2 className="text-lg font-bold line-clamp-2">
                    {title}
                  </h2>
                </div>

                {/* Access Badge */}
                <span
                  className={`badge gap-1 ${
                    accessLevel === "Premium"
                      ? "badge-warning"
                      : "badge-success"
                  }`}
                >
                  {accessLevel === "Premium" ? <FaLock /> : <FaUnlock />}
                  {accessLevel}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 line-clamp-3">
                {description}
              </p>

              {/* Emotional Tone */}
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium w-fit">
                <FaRegSmile />
                {emotionalTone}
              </span>

              <div className="divider my-2"></div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={creatorPhoto || "https://i.ibb.co/2kRZ1dB/user.png"}
                    alt={creatorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {creatorName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Link to={`details/${lesson._id}`}
                  disabled={isLocked}
                  className="btn btn-sm btn-outline btn-primary rounded-full gap-2 disabled:opacity-40"
                >
                  See Details
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LessonCard;
