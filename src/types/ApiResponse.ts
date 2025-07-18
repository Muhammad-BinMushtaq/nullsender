import  {Message} from "@/models/user"

export interface ApiResponse{
    status:boolean,
    message:string,
    isAcceptingMessages?:boolean
    messages?:Array<Message>

}