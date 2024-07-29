export const revalidate = 30

import HeroSection from '@/components/layouts/HeroSection'
import AllArticlesSection from '@/components/layouts/AllArticlesSection'
import TrendingSection from '@/components/layouts/TrendingSection'
import Recommended from '@/components/layouts/Recommended'
import SearchBar from '@/components/layouts/SearchBar'
import Results from '@/components/layouts/Results'
import Link from 'next/link'
import { Car, PenLine } from 'lucide-react'
import { DomainUrl } from '../../Codynn-Components/constants/DomainUrl'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { BLOGS_DOMAIN_URL } from '@/constants/domain_url'

export default function Home({
  searchParams: { q }
}: {
  searchParams: { q: string }
}) {
  return (
    <div>
      <div className='max-w-[1134px] mx-auto'>
        <div className='flex md:flex-row flex-col items-center pt-4 justify-between gap-1 md:gap-10'>
          <SearchBar />

          <Link
            className={`flex hover:bg-[#ddd] md:ml-0 ml-auto transition-colors duration-300 items-center rounded-full px-10 py-3 bg-[#F6F6F6B2] gap-x-2`}
            href={`${BLOGS_DOMAIN_URL}/write`}
          >
            <PenLine size={17} />
            Write
          </Link>
        </div>

        {!q ? (
          <>
            <HeroSection />
            <AllArticlesSection />
            <TrendingSection />
            <Recommended />
          </>
        ) : (
          <Results query={q} />
        )}
      </div>
    </div>
  )
}
