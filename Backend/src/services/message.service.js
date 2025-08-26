import Message from "../models/message.mode";

export const createMessage= async(message)=>{
    const mess= new Message(message);
    return await mess.save();

}

export const getMessage= async()=>{
    const messages= Message.find();
    return messages;
}