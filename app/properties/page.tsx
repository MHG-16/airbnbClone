import React from 'react'

import getCurrentUser from '../actions/getCurrentUser';
import ClientOnly from '../components/share/ClientOnly';
import EmptyState from '../components/share/EmptyState';
import getListings from '../actions/getListings';
import PropertiesClient from './TripsClient';


const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if(!currentUser) return (
    <ClientOnly>
        <EmptyState 
            title='Unauthorized'
            subtitle='Please login'
        />
    </ClientOnly>
  )

  const listings = await getListings({userId: currentUser.id});

  if (listings.length === 0) return(
    <ClientOnly>
        <EmptyState 
            title='No trips found'
            subtitle="Looks like you haven't any properties."
        />
    </ClientOnly>
  )
  return (
    <ClientOnly>
        <PropertiesClient 
            listings={listings}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default PropertiesPage