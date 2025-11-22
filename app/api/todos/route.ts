import {prisma} from '@/lib/prisma';
import { NextResponse } from "next/server";


// Get data
export async function GET(){
    try{
        const todos = await prisma.todo.findMany({
            orderBy:{id:"desc"}
        });
    return NextResponse.json({
        success:true,
        status:200,
        data:todos
    });
    }catch(err){
        return NextResponse.json({
            success:false,
            status:500,
            error:err
        });
    }
    
}



// Create data
export async function POST(req:Request){
    try{
        const body = await req.json();
            const newTodo = await prisma.todo.create({
                data:{
                    text:body.text
                }
        });
        return NextResponse.json({
            success:true,
            status:200,
            data:newTodo
        });
    }catch(err){
        return NextResponse.json({
            success:false,
            status:500,
            error:err
        });
    }
    
}