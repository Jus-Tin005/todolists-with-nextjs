// GET one, PUT update, DELETE


import { NextResponse } from "next/server";
import { Prisma } from "@/lib/prisma";

interface Params{
    params:{id:string};
}

// GET single todo 



