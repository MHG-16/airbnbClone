'use client';
import {TbBrandAirbnb} from "react-icons/tb"
import React from 'react';
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();
    return (
    <div>
        <div className="brand flex flex-row gap-2 text-rose-500 items-center">
            <TbBrandAirbnb size={32}/>
            <label className="text-center text-xl font-semibold">Airbnb</label>
        </div>
    </div>
  )
}

export default Logo