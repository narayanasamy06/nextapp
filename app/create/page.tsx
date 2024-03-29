'use client';
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateFleet = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      setError('Please fill in all the fields');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/fleets', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create fleet');
      }

      router.push('/');
    } catch (error) {
      console.log(error);
      setError('Something went wrong. Please try again.');
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
          {isLoading ? 'Creating...' : 'Create Fleet'}
        </button>
      </form>
    </div>
  );
};

export default CreateFleet;
