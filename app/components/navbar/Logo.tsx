'use client';
import {TbBrandAirbnb} from "react-icons/tb"
import React from 'react';
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();
    return (
    <div onClick={() => router.push("/")}>
        <div className="brand flex flex-row gap-2 text-rose-500 items-center cursor-pointer">
            <TbBrandAirbnb size={32}/>
            <label className="text-center text-xl font-semibold cursor-pointer">Airbnb</label>
        </div>
    </div>
  )
}

export default Logo