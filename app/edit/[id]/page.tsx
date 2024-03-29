'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

 const EditPage = ({ params }: { params: { id: string } }) => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<null | string>();

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/fleets/${params.id}`);
        if (!res.ok) {
          throw new Error('error to updatate data');
        }
        const data = await res.json();
        console.log(data);
        setFormData({
          title: data.response.title,
          content: data.response.content,
        });
      } catch (error) {
        setError('Failed to load interpretation.');
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content || !formData.title) {
      setError('unable to update the form');
      return;
    }

    try {
      const res = await fetch(`/api/fleets/${params.id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body:JSON.stringify(formData)
      });

      if(!res.ok) {
        throw new Error('failed to update form');
      }
      router.push('/');
    } catch (error) {
        console.log(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    } 
  };


  return (
    <div className='container mx-auto p-4'>
      {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
      <form
        onSubmit={handleSubmit}
        className='flex flex-col space-y-4 w-8/12 mx-auto'
      >
        <input
          type='text'
          name='title'
          placeholder='Fleet'
          value={formData.title}
          onChange={handleInputChange}
          className='border p-2 rounded-md'
        />
        <textarea
          name='content'
          placeholder='Write your content here'
          value={formData.content}
          onChange={handleInputChange}
          rows={4}
          className='border p-2 rounded-md'
        ></textarea>
        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          {isLoading ? 'Updating...' : 'Update Fleet'}
        </button>
      </form>
    </div>
  );

};
export default EditPage