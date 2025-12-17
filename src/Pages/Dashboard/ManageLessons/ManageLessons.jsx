import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';

const ManageLessons = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth()
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["lesson"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/lessons`, user?.email);
      return result.data;
    },
  });

  console.log(lessons);
  return (
    <div className='text-black'>
      ManageLessons
    </div>
  );
};

export default ManageLessons;