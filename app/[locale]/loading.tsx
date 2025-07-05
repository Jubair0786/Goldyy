import { getTranslations } from 'next-intl/server'
import { Loader2 } from 'lucide-react'

export default async function LoadingPage() {
  const t = await getTranslations()

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white text-center'>
      <div className='p-6 rounded-lg shadow-md w-full max-w-sm border border-gray-200 bg-gray-50'>
        <div className='flex justify-center mb-4'>
          <Loader2 className='w-10 h-10 animate-spin text-blue-500' />
        </div>
        <h2 className='text-lg font-semibold text-gray-700'>
          {t('Loading.Loading')}
        </h2>
        <p className='text-sm text-gray-500 mt-2'>Please wait while we prepare your experience...</p>
      </div>
    </div>
  )
}
