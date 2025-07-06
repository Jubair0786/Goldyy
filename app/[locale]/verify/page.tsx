import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'

export default function Verify() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 md:p-10 border">
  <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Verify Your Product</h1>
  <p className="text-gray-600 mb-8 text-center">
    Enter your product scratch code below to verify its authenticity.
  </p>

  <form className="space-y-6">
    <div>
      <label htmlFor="scratchCode" className="block text-sm font-medium text-gray-700 mb-1">
        Scratch Code
      </label>
      <input
        type="text"
        id="scratchCode"
        name="scratchCode"
        placeholder="e.g., ABC123XYZ"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div className="text-center">
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Verify Now
      </button>
    </div>
  </form>
</div>

      </main>

      <Footer />
    </div>
  )
}
