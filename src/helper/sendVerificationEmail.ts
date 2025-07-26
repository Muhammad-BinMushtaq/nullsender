import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail"
import { ApiResponse } from "@/types/ApiResponse";



export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string): Promise<ApiResponse> {


    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Email Verification',
            react: VerificationEmail({ username, otp: verifyCode })
        });

        return { status: true, message: "Message send successfully" }
    }
    catch (error) {
        console.log(error)
        return { status: false, message: "Verificarion email failed to send" }
    }

}