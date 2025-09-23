import { getTranslations } from 'next-intl/server'

export default async function LoadingPage() {
  const t = await getTranslations()
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-4 py-8'>
      {/* Main loading container */}
      <div className='relative overflow-hidden w-full max-w-xs sm:max-w-md mx-auto'>
        {/* Animated Fizz App text */}
        <div className='relative h-16 sm:h-20 flex items-center justify-center'>
          <div className='text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse text-center'>
            Fizz App
          </div>
        </div>
        
        {/* Loading text */}
        <div className='text-center mt-6 sm:mt-8'>
          <p className='text-base sm:text-lg text-gray-600 dark:text-gray-300 animate-pulse'>
            {t('Loading.Loading')}
          </p>
        </div>
        
        {/* Animated dots */}
        <div className='flex justify-center mt-4 sm:mt-6 space-x-2'>
          <div className='w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-bounce'></div>
          <div className='w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:0.1s]'></div>
          <div className='w-2.5 h-2.5 sm:w-3 sm:h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:0.2s]'></div>
        </div>
        
        {/* Progress bar */}
        <div className='mt-6 sm:mt-8 w-full h-1.5 sm:h-2 overflow-hidden rounded-full'>
          <div className='bg-gradient-to-r from-blue-500 to-purple-500 h-full w-full rounded-full animate-pulse transition-all duration-1000 ease-in-out'></div>
        </div>
        
        {/* Additional mobile-friendly elements */}
        <div className='text-center mt-4 sm:mt-6'>
          <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 animate-pulse'>
            Please wait a moment...
          </p>
        </div>
      </div>
      
      {/* Mobile touch-friendly area indicator */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center'>
        <div className='w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse'></div>
      </div>
    </div>
  )
}