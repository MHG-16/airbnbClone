import React from 'react';

import { SafeListing, SafeUser } from '../types'
import Container from '../components/share/Container'
import Heading from '../components/share/Heading';
import ListingCard from '../components/listings/ListingCard';

interface FavoritesListingClientProps {
    listings: SafeListing[]
    currentUser: SafeUser
}

const FavoritesListingClient : React.FC<FavoritesListingClientProps> = ({
    listings,
    currentUser
}) => {
  return (
    <Container>
        <Heading 
            title="Favorites"
            subtitle="List of places you have favorited!"
        />
        <div className='mt-10 grid grid-cols-1
        sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        xl:grid-cols-5 xs:grid-cols-6 gap-8'>
            { listings.map((listing) => (
                <ListingCard 
                    key={listing.id}
                    user={currentUser}
                    data={listing}
                />
            ))}
        </div>
    </Container>
  )
}

export default FavoritesListingClient