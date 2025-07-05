'use client'

import { useState } from 'react'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface ProductGalleryProps {
  images: string[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number>(0)

  return (
    <div className='flex gap-4 flex-wrap md:flex-nowrap'>
      <div className='flex md:flex-col gap-2 mt-4 md:mt-8'>
        {images.map((image, index) => (
          <button
  key={index}
  onClick={() => setSelectedImage(index)}
  onMouseOver={() => setSelectedImage(index)}
  type='button'
  aria-label={`Select image ${index + 1}`}
  className={`bg-white rounded-lg overflow-hidden transition ring-offset-1 ${
    selectedImage === index
      ? 'ring-2 ring-blue-500'
      : 'ring-1 ring-gray-300'
  }`}
>

            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              width={64}
              height={64}
              className='object-contain'
            />
          </button>
        ))}
      </div>

      <div className='w-full'>
        <Zoom>
          <div className='relative h-[400px] md:h-[500px] w-full'>
            <Image
              src={images[selectedImage]}
              alt={`Selected Product Image`}
              fill
              sizes='(max-width: 768px) 100vw, 90vw'
              className='object-contain'
              priority
            />
          </div>
        </Zoom>
      </div>
    </div>
  )
}
