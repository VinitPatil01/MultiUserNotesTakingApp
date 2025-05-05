import { StatusCodes } from "http-status-codes";



export function getDashboard(request,response) {
    try {
        response
        .status(StatusCodes.OK)
        .send("Welcome to the dashboard");
    } catch (error) {
        console.log(error);
        response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({message:"Something went wrong"});
    }
}