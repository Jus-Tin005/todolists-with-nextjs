// GET one, PUT update, DELETE


import {prisma} from '@/lib/prisma';
import { NextResponse } from "next/server";

interface Params{
    params:{id:string};
}

// GET single todo 
export async function GET(_:Request,{ params }:Params){
    try{
            const todo = await prisma.todo.findUnique({
                where:{id:Number(params.id)},
            });

            if(!todo) return NextResponse.json({
                success:false,
                status:404,
                error:"Not Found"
            });
            return NextResponse.json({
                success:true,
                status:200,
                data:todo
            });
    }catch(err){
        return NextResponse.json({
            success:false,
            status:500,
            error:err
        });
    }
}


// UPDATE todo
export async function PUT(req:Request,{ params }:Params){
    const body = await req.json();

    try{
        const updated = await prisma.todo.update({
            where:{id:Number(params.id)},
            data:{
                text:body.text,
                completed:body.completed
            }
        });
        return NextResponse.json({
            success:true,
            status:200,
            data:updated
        });
    }catch{
        return NextResponse.json({
            success:false,
            status:404,
            error:"Not Found"
        });
    }
}


// DELETE todo
export async function DELETE(_:Request,{params}:Params){
    try{
        const deleted = await prisma.todo.delete({
            where:{id:Number(params.id)},
        });
        return NextResponse.json({
            success:true,
            status:200,
            data:deleted
        });
    }catch{
        return NextResponse.json({
            success:false,
            status:404,
            error:"Not Found"
        });
    }
}

