import  {Message} from "@/models/user"

export interface ApiResponse{
    status:boolean,
    message:string,
    success?:boolean,
    isAcceptingMessages?:boolean
    messages?:Array<Message>

}