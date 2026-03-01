import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { IProduct } from '@/lib/db/models/product.model'

import Rating from './rating'
import { formatNumber, generateId, round2 } from '@/lib/utils'
import ProductPrice from './product.price'
import ImageHover from './image.hover'
import AddToCart from './add-to-cart'

const ProductCard = ({
  product,
  hideBorder = false,
  hideDetails = false,
  hideAddToCart = false,
}: {
  product: IProduct
  hideDetails?: boolean
  hideBorder?: boolean
  hideAddToCart?: boolean
}) => {
  const ProductImage = () => (
    <Link href={`/product/${product.slug}`}>
      <div className='relative h-52'>
        {product.images.length > 1 ? (
          <ImageHover
            src={product.images[0]}
            hoverSrc={product.images[1]}
            alt={product.name}
          />
        ) : (
          <div className='relative h-52'>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes='80vw'
              className='object-contain h-32'
            />
          </div>
        )}
      </div>
    </Link>
  )
  const ProductDetails = () => (
    <div className='flex-1 space-y-1'>
      <p className='font-bold text-xs'>{product.brand}</p>
      <Link
        href={`/product/${product.slug}`}
        className='overflow-hidden text-ellipsis text-xs block leading-tight'
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {product.name}
      </Link>
      <div className='flex gap-1 justify-center items-center'>
        <Rating rating={product.avgRating} size={3} />
        <span className='text-xs'>({formatNumber(product.numReviews)})</span>
      </div>

      <ProductPrice
        isDeal={product.tags.includes('todays-deal')}
        price={product.price}
        listPrice={product.listPrice}
        forListing
      />
    </div>
  )

  const AddButton = () => (
    <div className='w-full text-center'>
      <AddToCart
        minimal
        item={{
          clientId: generateId(),
          product: product._id,
          size: product.sizes[0],
          color: product.colors[0],
          countInStock: product.countInStock,
          name: product.name,
          slug: product.slug,
          category: product.category,
          price: round2(product.price),
          quantity: 1,
          image: product.images[0],
        }}
      />
    </div>
  )

  return hideBorder ? (
    <div className='flex flex-col'>
      <ProductImage />
      {!hideDetails && (
        <>
          <div className='p-2 flex-1 text-center'>
            <ProductDetails />
          </div>
          {!hideAddToCart && (
            <div className='px-2 pb-2'>
              <AddButton />
            </div>
          )}
        </>
      )}
    </div>
  ) : (
    <Card className='flex flex-col'>
      <CardHeader className='p-2'>
        <ProductImage />
      </CardHeader>
      {!hideDetails && (
        <>
          <CardContent className='p-2 py-1 flex-1 text-center'>
            <ProductDetails />
          </CardContent>
          <CardFooter className='p-2 pt-0'>
            {!hideAddToCart && <AddButton />}
          </CardFooter>
        </>
      )}
    </Card>
  )
}

export default ProductCard