export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'fizzApp'
export const APP_SLOGAN =
  process.env.NEXT_PUBLIC_APP_SLOGAN || 'Spend less, Enjoy more'
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'An Ecommerce App built with Next.js, MongoDB, Shadcn'
export const PAGE_SIZE = Number(process.env.PAGE_SIZE || 9)
export const APP_COPYRIGHT =
  process.env.NEXT_PUBLIC_APP_COPYRIGHT ||
  `Copyright © 2025 ${APP_NAME}. All rights reserved.`
export const FREE_SHIPPING_MIN_PRICE = Number(
  process.env.FREE_SHIPPING_MIN_PRICE || 35
)
