import { fetchUser, fetchUsers } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs' 
import { redirect } from 'next/navigation'
import UserCard from '@/components/cards/UserCard'
import SearchBar from '@/components/shared/SearchBar'
import Pagination from '@/components/shared/Pagination'

const Page = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  // Fetch users
  const results = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  })

  return (
    <div>
      <h1 className='head-text mb-10'>Search</h1>

      {/* Search Box */}
      <SearchBar routeType='search' />

      <div className='mt-14 flex flex-col gap-9'>
        {
          results.users.length === 0
            ? <p className='no-result'>No users</p>
            : <>
                {
                  results.users.map((person) => (
                    <UserCard
                      key={person.id}
                      id={person.id}
                      name={person.name}
                      username={person.username}
                      imgUrl={person.image}
                      personType='User'
                    />
                  ))
                }
              </>
        }
      </div>

      <Pagination
        path='search'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={results.isNext}
      />
    </div>
  )
}

export default Page
