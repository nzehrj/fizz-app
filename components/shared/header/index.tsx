import Image from 'next/image'
import Link from 'next/link'
import { getAllCategories } from '@/lib/actions/product.actions'
import Menu from './menu'
import Search from './search'
import data from '@/lib/data'
import Sidebar from './sidebar'
import { getSetting } from '@/lib/actions/setting.actions'
import { getTranslations } from 'next-intl/server'

export default async function Header() {
  const categories = await getAllCategories()
  const { site } = await getSetting()
  const t = await getTranslations()
  
  // Prepare translations for client component
  const searchTranslations = {
    all: t('Header.All'),
    searchPlaceholder: t('Header.Search Site', { name: site.name })
  }
  
  return (
    <header className='bg-black text-white'>
      <div className='px-2 md:px-4 lg:px-8 xl:px-10'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link
              href='/'
              className='flex items-center header-button font-extrabold text-2xl m-1'
            >
              {/* Fix for empty logo src */}
              {site.logo && site.logo.trim() !== '' && (
                <Image
                  src={site.logo}
                  width={40}
                  height={40}
                  alt={`${site.name} logo`}
                />
              )}
              {site.name}
            </Link>
          </div>
          
          {/* Search component - handles responsive behavior internally */}
          <div className='flex-1 max-w-xl flex justify-end md:justify-center'>
            <Search categories={categories} translations={searchTranslations} />
          </div>
          
          <Menu />
        </div>
      </div>
      <div className='px-2 md:px-4 lg:px-8 xl:px-10 flex items-center mb-[1px] bg-gray-400'>
        <Sidebar categories={categories} />
        <div className='flex items-center flex-wrap gap-3 overflow-hidden max-h-[42px]'>
          {data.headerMenus.map((menu) => (
            <Link
              href={menu.href}
              key={menu.href}
              className='header-button !p-2'
            >
              {t('Header.' + menu.name)}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}