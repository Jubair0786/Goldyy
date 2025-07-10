import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db/index'
import ScratchCode from '@/lib/db/models/ScratchCode'

export async function POST(req: Request) {
  try {
    await connectToDatabase()

    const { code } = await req.json()

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ message: 'Scratch code is required.' }, { status: 400 })
    }

    const trimmedCode = code.trim()
    const scratch = await ScratchCode.findOne({ code: trimmedCode })

    if (!scratch) {
      return NextResponse.json({ message: 'Invalid Code ❌' }, { status: 404 })
    }

    // ✅ Do not mark as used, always return success
    return NextResponse.json({
      message: '✅ Verified: You are holding an original Goldyy Supplements product — crafted for performance, trusted for purity.',
      usedAt: scratch.usedAt || scratch.createdAt, // optional
    }, { status: 200 })

  } catch (err) {
    console.error('[VERIFY_SCRATCH_CODE_ERROR]', err)
    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 })
  }
}
