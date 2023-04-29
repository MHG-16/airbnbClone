'use client';

import React from 'react'
import { IconType } from 'react-icons';

import useCountries from '@/app/hooks/useCountires';
import { SafeUser } from '@/app/types';
import Avatar from '../navbar/Avatar';
import ListingCategory from './ListingCategory';
import Map  from '../share/Map';


interface ListingInfoProps {
    user: SafeUser;
    description: string;
    roomCount: number;
    guestCount: number;
    bathroomCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
    locationValue: string;
}
const ListingInfo : React.FC<ListingInfoProps> = ({
    user,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    category,
    locationValue
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div className='col-span-4 flex flex-col gap-2'>
        <div className='text-xl font-semibold flex flex-row items-center gap-2'>
            <div>Hosted by {user?.name}</div>
            <Avatar src={user?.image}/>
        </div>
        <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
            <div>{guestCount} guests</div>
            <div>{roomCount} rooms</div>
            <div>{bathroomCount} bathrooms</div>
        </div>
        <hr />
        { category && (
            <ListingCategory 
                icon={category.icon}
                label={category.label}
                description={category.description}
            />
        )}
        <hr />
        <div className='text-lg font-light text-neutral-500'>
            {description}
        </div>
        <Map center={coordinates}/>
    </div>
  )
}

export default ListingInfo