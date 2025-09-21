import { SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { getAllCategories } from '@/lib/actions/product.actions'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
import { getSetting } from '@/lib/actions/setting.actions'
import { getTranslations } from 'next-intl/server'

export default async function Search() {
  const {
    site: { name },
  } = await getSetting()
  const categories = await getAllCategories()

  const t = await getTranslations()
  return (
    <form
      action="/search"
      method="GET"
      className="flex items-stretch h-8 md:w-96"
    >
      <Select name="category">
        <SelectTrigger className="w-20 h-full dark:border-gray-200 bg-gray-100 text-black border-r rounded-r-none rounded-l-md rtl:rounded-r-md rtl:rounded-l-none text-xs px-2">
          <SelectValue placeholder={t('Header.All')} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="all">{t('Header.All')}</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        className="flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-sm h-full px-2"
        placeholder={t('Header.Search Site', { name })}
        name="q"
        type="search"
      />

      <button
        type="submit"
        className="bg-primary text-primary-foreground text-black rounded-s-none rounded-e-md h-full px-2"
      >
        <SearchIcon className="w-4 h-4" />
      </button>
    </form>
  )
}