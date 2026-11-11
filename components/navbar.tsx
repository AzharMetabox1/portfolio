"use client"
import Link from "next/link";

type navbarProps = {
    name : string;
    age : number;
}
const items = ["Routing","Rendering","Caching"]

export default function Navbar({name , age}:navbarProps){
    return (
        <nav className = "flex items-center justify-between px-8 py-4 border-b">
            <h1 className= "text-xl font-bold">
                hello my name is {name} and i'm {age} old.
            </h1>
            <div className="flex gap-6">
                <ul>
                   {items.map((item)=>(
                <li key={item}>{item}</li>
             ))} 
                </ul>
            </div>
        </nav>
    )

}