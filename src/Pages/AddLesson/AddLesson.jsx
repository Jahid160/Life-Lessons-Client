import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Component/Loading/Loading";
import useUserByEmail from "../../Hooks/useUserByEmail ";

const AddLesson = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();


  const addLesson = async (lessonData) => {
    const { data } = await axiosSecure.post("/lessons", lessonData);
    return data;
  };

  // 🔹 useMutation
  const { mutate, isLoading } = useMutation({
    mutationFn: addLesson,
    onSuccess: (data) => {
      if (data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Lesson successfully added",
          showConfirmButton: false,
          timer: 2000,
        });

        // refresh lessons
        queryClient.invalidateQueries(["lessons"]);
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Failed to create lesson",
        text: error.message,
      });
    },
  });

const { userData, isLoading:loading, refetch } = useUserByEmail();

  if (loading) return <Loading></Loading>;
const isPremium = userData?.isPremium

  // 🔹 form submit handler
  const handleSubmitData = async (data) => {
    try {
      let imageUrl = "";

      // upload image if exists
      if (data.photo?.[0]) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        const res = await fetch(image_API_URL, {
          method: "POST",
          body: formData,
        });

        const imgData = await res.json();

        if (!imgData.success) {
          return Swal.fire("Error", "Image upload failed", "error");
        }

        imageUrl = imgData.data.display_url;
      }

      const lessonData = {
        title: data.title,
        description: data.description,
        createAt: new Date(),
        category: data.category,
        emotionalTone: data.emotionalTone,
        privacy: data.privacy,
        accessLevel: data.accessLevel,
        email: user?.email,
        image: imageUrl,
      };

      mutate(lessonData);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-black">
      <div className="bg-base-100 shadow-xl rounded-2xl p-8">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Life Lesson
        </h2>

        <form onSubmit={handleSubmit(handleSubmitData)} className="space-y-6">

          <input
            {...register("title", { required: true })}
            placeholder="Lesson title"
            className="input input-bordered w-full"
          />

          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full h-40"
            placeholder="Lesson description"
          />

          <select {...register("category")} className="select select-bordered w-full">
            <option>Personal Growth</option>
            <option>Career</option>
            <option>Relationships</option>
            <option>Mindset</option>
            <option>Mistakes Learned</option>
          </select>

          <select {...register("emotionalTone")} className="select select-bordered w-full">
            <option>Motivational</option>
            <option>Sad</option>
            <option>Realization</option>
            <option>Gratitude</option>
          </select>

          <select {...register("privacy")} className="select select-bordered w-full">
            <option>Public</option>
            <option>Private</option>
          </select>

          <select
            {...register("accessLevel")}
            disabled={!isPremium}
            className="select select-bordered w-full"
          >
{
  isPremium == true?  <>
              <option>Free</option>
            <option>Premium</option>
  </>
  : <option>Free</option>
}
          </select>

          <input
            type="file"
            accept="image/*"
            {...register("photo")}
            className="file-input file-input-bordered w-full"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full"
          >
            {isLoading ? "Creating..." : "Create Lesson"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddLesson;
