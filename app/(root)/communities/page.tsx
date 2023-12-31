import { fetchUser, fetchUsers } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs' 
import { redirect } from 'next/navigation'
import { fetchCommunities } from '@/lib/actions/community.actions'
import CommunityCard from '@/components/cards/CommunityCard'
import SearchBar from '@/components/shared/SearchBar'
import Pagination from '@/components/shared/Pagination'

const Page = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  // Fetch users
  const results = await fetchCommunities({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  })

  return (
    <div>
      <h1 className='head-text mb-10'>Search</h1>

      {/* Search Box */}
      <div className='mt-5'>
        <SearchBar routeType='communities' />
      </div>

      <div className='mt-14 flex flex-col gap-9'>
        {
          results.communities.length === 0
            ? <p className='no-result'>No communities</p>
            : <>
                {
                  results.communities.map((community) => (
                    <CommunityCard
                      key={community.id}
                      id={community.id}
                      name={community.name}
                      username={community.username}
                      imgUrl={community.image}
                      bio={community.bio}
                      members={community.members}
                    />
                  ))
                }
              </>
        }
      </div>

      <Pagination
        path='communities'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={results.isNext}
      />
    </div>
  )
}

export default Page
