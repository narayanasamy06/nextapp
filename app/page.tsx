'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Ifleet {
  $id: string;
  title: string;
  content: string;
}

export default function Home() {
  const [fleets, setFleets] = useState<Ifleet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchFleets = async () => {
      try {
        const response = await fetch('/api/fleets');
        if (!response.ok) {
          throw new Error('Failed to fetch fleets');
        }
        const data = await response.json();
        setFleets(data);
      } catch (error) {
        console.log('error', error);
        setError('failed to fetch');
      } finally {
        setIsLoading(false);
      }
    };
    fetchFleets();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/fleets/${id}`, { method: 'DELETE' });
      setFleets((prevFleets) => prevFleets?.filter((i) => i.$id != id));
    } catch (error) {
      setError('Failed to delete interpretation. Please try again.');
    }
  };

  return (
    <div className='container mx-auto p-4'>
      {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
      {isLoading ? (
        <p className='text-center'>Loading...</p>
      ) : fleets.length > 0 ? (
        <div className='flex flex-col gap-4'>
          {fleets.map((fl) => (
            <div
              key={fl.$id}
              className='border p-4 rounded-md shadow-md flex flex-col gap-2 w-8/12 mx-auto'
            >
              <div className='font-bold text-lg mb-2'>{fl.title}</div>
              <div className='text-gray-600'>{fl.content}</div>
              <div className='mt-4 flex justify-between items-center'>
                <Link
                  href={`/edit/${fl.$id}`}
                  className='text-blue-500 hover:underline'
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(fl.$id)}
                  className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center'>No fleets available</p>
      )}
    </div>
  );
}
