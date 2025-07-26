import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { X } from "lucide-react"
import { Message } from "@/models/user"


type MessageCardProps = {
    message: Message,
    onMessageDelete: (messageId: string) => void
}



const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {

    const handleDeleteConfirm = async () => {
        // const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
        // toast(response.data.message)
        onMessageDelete(message._id)
    }
  return (
    <Card className="group relative w-full bg-gradient-to-br from-white via-purple-50/20 to-white rounded-[2rem] shadow-xl border-0 hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] overflow-hidden backdrop-blur-sm">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-300/20 to-purple-500/20 rounded-[2rem] p-[1px]">
            <div className="w-full h-full bg-white rounded-[calc(2rem-1px)]"></div>
        </div>
        
        {/* Floating Orb Decoration */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

        <CardHeader className="relative z-10 p-8 pb-6">
            {/* Header with Enhanced Typography */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
                    <CardTitle className="text-2xl font-black text-gray-900 leading-tight tracking-tight">
                        Anonymous
                        <span className="block text-sm font-bold text-purple-600 mt-1 tracking-wider uppercase">
                            Message
                        </span>
                    </CardTitle>
                </div>
                
                {/* Enhanced Delete Button */}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="w-12 h-12 rounded-2xl hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100 hover:scale-110 transition-all duration-300 flex-shrink-0 group/delete"
                        >
                            <X className="w-5 h-5 text-red-400 group-hover/delete:text-red-600 group-hover/delete:rotate-90 transition-all duration-300" />
                        </Button>
                    </AlertDialogTrigger>
                    
                    {/* Premium Delete Dialog */}
                    <AlertDialogContent className="rounded-[2rem] border-0 shadow-2xl bg-white max-w-md overflow-hidden">
                        {/* Gradient Header */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-pink-400 to-red-500"></div>
                        
                        <AlertDialogHeader className="text-center p-8 pb-6">
                            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center mx-auto mb-6 shadow-inner">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                                    <X className="w-8 h-8 text-red-500" />
                                </div>
                            </div>
                            <AlertDialogTitle className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
                                Delete Message?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-lg font-semibold text-gray-600 leading-relaxed">
                                This message will be <span className="text-red-500 font-bold">permanently deleted</span> and cannot be recovered.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        
                        <AlertDialogFooter className="flex gap-4 p-8 pt-0">
                            <AlertDialogCancel className="flex-1 rounded-2xl border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 text-base transition-all duration-200 hover:scale-105">
                                Keep Message
                            </AlertDialogCancel>
                            <AlertDialogAction 
                                onClick={handleDeleteConfirm}
                                className="flex-1 rounded-2xl bg-gradient-to-r from-red-500 via-red-600 to-red-500 hover:from-red-600 hover:via-red-700 hover:to-red-600 text-white font-bold py-4 text-base shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
                            >
                                Delete Forever
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            {/* Enhanced Message Content */}
            <div className="relative">
                <CardDescription className="text-lg font-semibold text-gray-800 leading-relaxed line-height-7 min-h-[3rem] relative z-10">
                    <span className="text-6xl font-black text-purple-200/40 absolute -top-4 -left-2 leading-none select-none">"</span>
                    <span className="relative z-10 pl-4">
                        {message.content}
                    </span>
                    <span className="text-6xl font-black text-purple-200/40 absolute -bottom-6 -right-2 leading-none select-none rotate-180">"</span>
                </CardDescription>
            </div>
        </CardHeader>

        <CardContent className="relative z-10 px-8 pb-8 pt-0">
            {/* Enhanced Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-gradient-to-r from-transparent via-purple-200/50 to-transparent">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <span className="text-base font-bold text-gray-500 tracking-wide">
                        ANONYMOUS SENDER
                    </span>
                </div>
                
                {/* Message Status Indicator */}
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-lg"></div>
                    <span className="text-sm font-bold text-green-600 uppercase tracking-wider">Received</span>
                </div>
            </div>
        </CardContent>
    </Card>
);
}


export default MessageCard