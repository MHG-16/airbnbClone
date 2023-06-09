"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeUser, safeReservation } from "../types";
import Container from "../components/share/Container";
import Heading from "../components/share/Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
  reservations: safeReservation[];
  currentUser: SafeUser;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeltingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeltingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.push('/trips');
        })
        .catch((error) => toast.error(error?.response?.data?.error))
        .finally(() => setDeltingId(""));
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div
        className="mt-10 grid grid-cols-1
        sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        xl:grid-col-5 2xl:grid-cols-6 gap-8
        "
      >
        {reservations.map((reservation) => (
            <ListingCard 
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId === reservation.id}
                actionLabel="Cancel reservation"
                user={currentUser}
            /> 
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
