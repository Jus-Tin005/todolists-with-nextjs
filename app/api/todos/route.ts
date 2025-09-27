// GET all, POST create


import { NextResponse } from "next/server";
import {prisma} from '@/lib/prisma';


// Fet todo lists
export async function GET(){
    const todos = await prisma.todo.findMany({
        orderBy:{id:"desc"}
    });
    return NextResponse.json(todos);
}

// Create todo
export async function POST(req:Request){
    const body = await req.json();
    console.log(body);  
    const newTodo = await prisma.todo.create({
        data:{
            title:body.title
        }
    });

    return NextResponse.json(newTodo,{status:201});
}