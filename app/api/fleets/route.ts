import client from '@/lib/appwrite_client';
import { Databases, ID, Query } from 'appwrite';
import { NextResponse } from 'next/server';

const database = new Databases(client);

const createFleet = async (data: { title: string; content: string }) => {
  try {
    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      'Fleets',
      ID.unique(),
      data,
    );
    return response;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create fleet');
  }
};

const fetchFleet = async () => {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      'Fleets',
      
    );
    // console.log(response.documents);
    const res = response.documents;
    const sortedData = res.sort((a, b) => {
      const dateA = new Date(a.$createdAt).getTime();
      const dateB = new Date(b.$createdAt).getTime();
      
      return dateB - dateA;
    })
    // console.log(sortedData);
    
    return response.documents;
  } catch (error) {
    console.error('Error fetching interpretations', error);
    throw new Error('Failed to fetch interpretations');
  }
};

export const POST = async (req: Request) => {
  try {
    const { title, content } = await req.json();
    const data = { title, content };
    const response = await createFleet(data);
    return NextResponse.json(
      { message: 'Fleet created  succesfully' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error to create fleet' },
      { status: 500 },
    );
  }
};

export const GET = async () => {
  try {
    const response = await fetchFleet();
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { message: 'error to get fleet' },
      { status: 500 },
    );
  }
};
