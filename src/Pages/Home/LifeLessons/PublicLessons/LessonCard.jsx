import {
  FaRegSmile,
  FaLock,
  FaUnlock,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Loading from "../../../../Component/Loading/Loading";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";


import { useState } from "react";
import useUserByEmail from "../../../../Hooks/useUserByEmail ";
import useAuth from "../../../../Hooks/useAuth";

const LessonCard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { userData, isLoading: userLoading } = useUserByEmail();

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lessons", currentPage],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?page=${currentPage}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading || userLoading) return <Loading />;
  if (isError) return <div className="text-error text-center py-10">Error loading lessons...</div>;

  const { lessons = [], total = 0, totalPages = 1 } = data || {};
  const isPremium = userData?.isPremium === false || userData?.isPremium === "false";

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);
    if (currentPage > 3) pages.push("...");
    
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Lessons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {lessons.map((lesson) => {
          const {
            _id,
            title,
            description,
            category,
            emotionalTone,
            creatorName,
            createdAt,
            image,
            accessLevel,
          } = lesson;

          const isLocked = accessLevel === "Premium" && isPremium;

          return (
            <div
              key={_id}
              className="relative rounded-2xl border border-base-200 bg-base-100 shadow-sm hover:shadow-lg transition-all overflow-hidden"
            >
              {isLocked && (
                <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center text-center px-6">
                  <FaLock className="text-3xl text-warning mb-3" />
                  <h3 className="font-semibold text-lg text-black">Premium Lesson</h3>
                  <Link 
                    to="/premium-upgrade" 
                    className="text-sm text-gray-500 underline mt-2"
                  >
                    Upgrade to view this lesson
                  </Link>
                </div>
              )}

              <div className={`p-6 space-y-4 ${isLocked ? "blur-sm pointer-events-none" : ""}`}>
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase text-primary">{category}</p>
                    <h2 className="text-lg font-bold line-clamp-2">{title}</h2>
                  </div>
                  <span
                    className={`badge gap-1 ${
                      accessLevel === "Premium" ? "badge-warning" : "badge-success"
                    }`}
                  >
                    {accessLevel === "Premium" ? <FaLock /> : <FaUnlock />}
                    {accessLevel}
                  </span>
                </div>

                <p className="text-sm text-gray-500 line-clamp-3">{description}</p>

                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium w-fit">
                  <FaRegSmile />
                  {emotionalTone}
                </span>

                <div className="divider my-2"></div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{creatorName}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    to={`details/${_id}`}
                    className="btn btn-sm btn-outline btn-primary rounded-full gap-2"
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
          <button
            className="btn btn-outline gap-2"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
            Previous
          </button>

          <div className="join">
            {getPageNumbers().map((page, idx) => (
              <button
                key={idx}
                className={`join-item btn ${
                  page === currentPage ? "btn-active" : ""
                } ${page === "..." ? "btn-disabled pointer-events-none" : ""}`}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="btn btn-outline gap-2"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default LessonCard;