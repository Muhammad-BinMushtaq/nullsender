import { dbConnection } from '@/lib/dbConnection'
import { verifySchema } from '@/schemas/verifySchema'
import z from 'zod'


const verificationSchema = z.object({
  verificationCode: verifySchema
})

export async function GET(request: Request) {
  await dbConnection()


  try {
    const { searchParams } = new URL(request.url)
    const queryParams = {
      verificationCode: searchParams.get('verificationCode') || ''
    }

    const result = verificationSchema.safeParse(queryParams)

    if (!result.success) {
      const errorMessage = result.error.format().verificationCode?._errors?.join(', ') || 'Invalid input'
      // const verificationErrors = result.error.format().verificationCode?._errors || []
      console.log(result)
      return Response.json({
        success: false,
        message: errorMessage
      }, { status: 400 })
    }

    return Response.json({
      success: true,
      message: 'code foramt is correct'
    }, { status: 201 })



  } catch (_error) {
    return Response.json({
      success: false,
      message: "internal server error"
    }, { status: 201 })
  }

}