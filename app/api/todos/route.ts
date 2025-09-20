// GET all, POST create


import { NextResponse } from "next/server";
import {Prisma} from '@/lib/prisma';


// Fet todo lists
export async function GET(){
    const todos = await Prisma.todo.findMany({oderBy:{id:"desc"}});
    return NextResponse.json(todos);
}

// Create todo
export async function POST(req:Request){
    const body = await req.json();
    const newTodo = await Prisma.todo.create({
        data:{
            title:body.title
        }
    });

    return NextResponse.json(newTodo,{status:201});
}