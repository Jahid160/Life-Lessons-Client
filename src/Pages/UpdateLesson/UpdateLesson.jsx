import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";

const UpdateLesson = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { data: lesson = [], isLoading } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const result = await axiosInstance.get(`/lessons/${id}`);
      return result.data;
    },
  });

  const {
    title,
    accessLevel,
    category,
    createdAt,
    description,
    privacy,
    image,
    emotionalTone,
  } = lesson;
  console.log(title);

  const isPremiumUser = false;

  //  update related info
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleSubmitData = async (data) => {
    const image = data.photo?.[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);

    console.log(formData);

    const image_API_URL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;
    console.log(image_API_URL);
    try {
      const res = await fetch(image_API_URL, {
        method: "POST",
        body: formData,
      });
      const imgData = await res.json();
      if (!imgData.success) {
        return alert("Image upload failed!");
      }

      const imageUrl = imgData.data.display_url; // PNG link
      console.log("Uploaded Image URL:", imageUrl);

      const lessonData = {
        title: data.title,
        description: data.description,
        category: data.category,
        emotionalTone: data.emotionalTone,
        createdAt:lesson?.createdAt,
        privacy: data.privacy,
        accessLevel: data.accessLevel,
        email: user?.email,
        name: user?.displayName,
        image: imageUrl, // Add uploaded PNG URL
      };

      console.log("lesson createAt",lesson);

      fetch(`http://localhost:3000/lessons/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lessonData),
      })
        .then((res) => res.json())
        .then((lessonData) => console.log(lessonData));
    } catch (error) {
      console.log(error, "image not found");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <div className="bg-base-100 shadow-xl rounded-2xl border border-base-300 p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-center">Update Life Lesson</h2>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(handleSubmitData)} className="space-y-6">
          {/* Lesson Title */}
          <div>
            <label className="label font-medium">Lesson Title</label>
            <input
              defaultValue={title}
              {...register("title", { required: true })}
              type="text"
              placeholder="Enter your lesson title"
              className="input input-bordered w-full rounded-xl focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className=" font-medium">
              Full Description / Story / Insight
            </label>
            <textarea 
            defaultValue={description}
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full h-40 rounded-xl "
              placeholder="Write your full lesson, story or insight..."
            ></textarea>
          </div>

          {/* Grid Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="label font-medium">Category</label>
              <select
              defaultValue={category}
                className="select select-bordered w-full rounded-xl"
                {...register("category", { required: true })}
              >
                <option>Personal Growth</option>
                <option>Career</option>
                <option>Relationships</option>
                <option>Mindset</option>
                <option>Mistakes Learned</option>
              </select>
            </div>

            {/* Emotional Tone */}
            <div>
              <label className="label font-medium">Emotional Tone</label>
              <select
              defaultValue={emotionalTone}
                className="select select-bordered w-full rounded-xl"
                {...register("emotionalTone", { required: true })}
              >
                <option>Motivational</option>
                <option>Sad</option>
                <option>Realization</option>
                <option>Gratitude</option>
              </select>
            </div>

            {/* Privacy */}
            <div>
              <label className="label font-medium">Privacy</label>
              <select
              defaultValue={privacy}
                {...register("privacy", { required: true })}
                className="select select-bordered w-full rounded-xl"
              >
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>

            {/* Access Level */}
            <div>
              <label className="label font-medium flex items-center gap-2">
                Access Level
              </label>

              <div className="relative">
                <select
                defaultValue={accessLevel}
                  {...register("accessLevel")}
                  className="select select-bordered w-full rounded-xl"
                  disabled={!isPremiumUser}
                  data-tip={
                    !isPremiumUser
                      ? "Upgrade to Premium to create paid lessons"
                      : ""
                  }
                >
                  <option>Free</option>
                  <option>Premium</option>
                </select>

                {!isPremiumUser && (
                  <div
                    className="tooltip tooltip-open absolute left-0 top-0"
                    // data-tip="Upgrade to Premium to create paid lessons"
                  ></div>
                )}
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="label font-medium">Upload Image (Optional)</label>
            <div className="p-6 bg-base-200 rounded-xl border border-base-300 flex items-center gap-4">
              <input
              
                type="file"
                accept="image/*"
                {...register("photo")}
                className="file-input file-input-bordered w-full rounded-xl"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="btn btn-primary w-full rounded-xl text-lg"
            >
              Update Lesson
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateLesson;
