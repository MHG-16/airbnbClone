'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { SafeListing, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client';
import { categories } from '@/app/components/navbar/Categories';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import useLoginModal from '@/app/hooks/useLogin';
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingReservation from '@/app/components/listings/ListingReservation';


const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}
interface ListingClientProps {
    reservation?: Reservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser: SafeUser | null ;
}

const ListingClient : React.FC<ListingClientProps> = ({
  reservation = [],  
  listing,
  currentUser
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, [listing.category]);

  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservation.forEach((reservation: any) => {
      
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates

  }, [reservation]);
  
  const [isLoading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    setLoading(true);

    axios.post('/api/reservation', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id
    })
    .then(()=> {
      toast.success("listing reserved!");
      setDateRange(initialDateRange);
      // Redirect to /trips
      router.refresh();
    })
    .catch(() => toast.error('something went wrong.'))
    .finally(() => setLoading(false))
  }, [currentUser, dateRange.endDate, dateRange.startDate, listing?.id, loginModal, router, totalPrice]);

  useEffect(() => {
    if(dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);
      if (dayCount) setTotalPrice(listing.price * dayCount);
      else setTotalPrice(listing.price)
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price])
  return (
    <div className='max-w-screen-lg mx-auto'>
      <div className='flex flex-col gap-6'>
        <ListingHead 
          title={listing.title}
          imageSrc={listing.imageSrc}
          locationValue={listing.locationValue}
          id={listing.id}
          currentUser={currentUser}
        />
        <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
          <ListingInfo 
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount} 
            locationValue={listing.locationValue}          
          />
          <div className='order-first mb-10 md:order-last first-letter
          md:col-span-3'>
            <ListingReservation 
             price={listing.price}
             totalPrice={totalPrice}
             onChangeDate={(value) => setDateRange(value)}
             dateRange={dateRange}
             onSubmit={onCreateReservation}
             disabled={isLoading}
             disabledDates={disabledDates}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingClient