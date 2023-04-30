import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import ClientOnly from "./components/share/ClientOnly";
import Container from "./components/share/Container";
import EmptyState from "./components/share/EmptyState";
import { IlistingsParams } from "./actions/getListings";


interface HomeProps {
  searchParams: IlistingsParams
}
export default async function Home ({searchParams} : HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  
  const isEmpty = listings.length === 0;
  if (isEmpty){
    return(
    <ClientOnly>
      <EmptyState showReset/>
    </ClientOnly>)
  }
  return (
    <ClientOnly>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2
          md:grid-cols-3 lg:grid-cols-4 
          xl:grid-cols-5 2xl:grid-cols-6 gap-8
        ">
          {listings.map((listing : any, index: number) => {
            return (
              <ListingCard key={listing.title + index}
                data={listing} user={currentUser}
              />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  )
}
