// GET one, PUT update, DELETE


import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// import { Param } from "@prisma/client/runtime/library";

interface Params{
    params:{id:string};
}

// GET single todo 
export async function GET(_:Request,{ params }:Params){
    const todo = await prisma.todo.findUnique({
        where:{id:Number(params.id)},
    });

    if(!todo) return NextResponse.json({error:"Not Found"},{status:404});
    return NextResponse.json(todo);
}


// UPDATE todo
export async function PUT(req:Request,{ params }:Params){
    const body = await req.json();

    try{
        const updated = await prisma.todo.update({
            where:{id:Number(params.id)},
            data:{
                title:body.title,
                completed:body.completed
            }
        });
        return NextResponse.json(updated);
    }catch{
        return NextResponse.json({error:"Not Found"},{status:404});
    }
}


// DELETE todo
export async function DELETE(_:Request,{params}:Params){
    try{
        const deleted = await prisma.todo.delete({
            where:{id:Number(params.id)},
        });
        return NextResponse.json(deleted);
    }catch{
        return NextResponse.json({error:"Not Found"},{status:404});
    }
}

