import ProfileHeader from '@/components/shared/ProfileHeader'
import { profileTabs } from '@/constants'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image';

const page = () => {
  return (
    <section>
      <ProfileHeader/>

      <div className='mt-9'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='flex min-h-[50px] flex-1 items-center gap-3 bg-dark-2 text-light-2 data-[state=active]:bg-[#0e0e12] data-[state=active]:text-light-2'>
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='flex min-h-[50px] flex-1 items-center gap-3 bg-dark-2 text-light-2 data-[state=active]:bg-[#0e0e12] data-[state=active]:text-light-2'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p className='max-sm:hidden'>{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {1}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className='w-full text-light-1'
            >
              {/* @ts-ignore */}
             {/*  <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType='User'
              /> */}
              <h1>HAHAHA</h1>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

export default page