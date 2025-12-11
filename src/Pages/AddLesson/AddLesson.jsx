import React from 'react';
import { useForm } from 'react-hook-form';

const AddLesson = () => {
  const {register,handleSubmit, formState: {errors}} = useForm()


  const handleSubmitData = (data) =>{
    console.log(data);
     fetch("http://localhost:5000/lessons", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitData)} className="card p-6 bg-base-100 shadow-xl max-w-lg mx-auto text-black">
      <h2 className="text-2xl font-bold mb-4">Add Life Lesson</h2>

      <input {...register('name')} type="text" placeholder="Title" className="input input-bordered mb-4 w-full" required />

      <textarea {...register('description')} placeholder="Description" className="textarea textarea-bordered mb-4 w-full" required />

      <input {...register('category')}  type="text" placeholder="Category" className="input input-bordered mb-4 w-full" required />

      <input {...register('emotionalTone')}  type="text" placeholder="Emotional Tone" className="input input-bordered mb-4 w-full" required />

      <input {...register('image')}  type="text" placeholder="Image URL (optional)" className="input input-bordered mb-4 w-full" />

      <button className="btn btn-primary w-full">Add Lesson</button>
    </form>
    </div>
  );
};

export default AddLesson;