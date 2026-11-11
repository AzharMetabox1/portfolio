import { NextResponse } from "next/server";

export async function GET(){
    const posts = [
        {id : 1, title:"hello world"},
        {id:2 , title: "second post"}
    ];
    return NextResponse.json(posts);
}

// /api/posts