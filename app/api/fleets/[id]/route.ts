import client from '@/lib/appwrite_client';
import { Databases } from 'appwrite';
import { NextRequest, NextResponse } from 'next/server';

const database = new Databases(client);

const fetchOneFleet = async (id: string) => {
  try {
    const fleet = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      'fleets',
      id,
    );
    // console.log(fleet);
    return fleet;
  } catch (error) {
    console.error('Error fetching fleet:', error);
    throw new Error('Failed to fetch fleet');
  }
};

const deleteFleet = async (id: string) => {
  try {
    const fleet = await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      'fleets',
      id,
    );

    return fleet;
  } catch (error) {
    console.error('Error deleting fleet:', error);
    throw new Error('Failed to fetch fleet');
  }
};

const updateFleet = async (
  id: string,
  data: { title: string; content: string },
) => {
  try {
    const fleet = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      'fleets',
      id,
      data,
    );
    return fleet;
  } catch (error) {
    console.error('Error deleting fleet:', error);
    throw new Error('Failed to delete fleet');
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const id = params.id;
    const response = await fetchOneFleet(id);
    // console.log(response);
    return NextResponse.json({response});
  } catch (error) {
    return NextResponse.json({ message: 'Error to fetch' }, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const id = params.id;
    const response = deleteFleet(id);
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ message: 'Error to delete' }, { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const fleet = await req.json();
    const id = params.id;
    const response = updateFleet(id, fleet);
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ message: 'Error to delete' }, { status: 500 });
  }
};
