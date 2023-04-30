"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "../types";
import Container from "../components/share/Container";
import Heading from "../components/share/Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser: SafeUser;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeltingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeltingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted!");
          router.push('/properties');
        })
        .catch((error) => toast.error(error?.response?.data?.error))
        .finally(() => setDeltingId(""));
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="List of your properties"
      />
      <div
        className="mt-10 grid grid-cols-1
        sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        xl:grid-col-5 2xl:grid-cols-6 gap-8
        "
      >
        {listings.map((listing) => (
            <ListingCard 
                key={listing.id}
                data={listing}
                actionId={listing.id}
                onAction={onCancel}
                disabled={deletingId === listing.id}
                actionLabel="Delete Property"
                user={currentUser}
            /> 
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
