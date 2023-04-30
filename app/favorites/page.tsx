import React from 'react'
import getFavoriteListings from '../actions/getFavoriteListings'
import getCurrentUser from '../actions/getCurrentUser';
import ClientOnly from '../components/share/ClientOnly';
import EmptyState from '../components/share/EmptyState';
import FavoritesListingClient from './FavoritesListing';

const FavoritesPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (!currentUser) return (
    <ClientOnly>
        <EmptyState 
            title='Unathorized'
            subtitle={"Please login !"}
        />
    </ClientOnly>
  );

  if (listings.length === 0) return (
    <ClientOnly>
        <EmptyState 
            title='No favorites found'
            subtitle={"You have no favorites yet"}
        />
    </ClientOnly>
  )
  return (
    <ClientOnly>
        <FavoritesListingClient
            listings={listings}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default FavoritesPage