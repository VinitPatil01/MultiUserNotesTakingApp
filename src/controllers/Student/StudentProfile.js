//select S.prn,concat(S.first_name,' ',S.last_name) as full_name,S.email,S.mobile_number,S.gender,S.course,S.center from Student S;

import { StatusCodes } from "http-status-codes";
import pool from "../../DbConfig/promiseDbConfig.js";

//select G.group_name from student S,usergroups UG,`groups` G where UG.student_prn=S.prn and UG.group_id=G.group_id and S.username="VinitPatil01";
export async function StudentProfile(request,response){
    try {
        const username =request.user.username;
        const studentDetailsQry=`select S.prn,concat(S.first_name,' ',S.last_name) as full_name,S.email,S.mobile_number,S.gender,S.course,S.center from Student S where S.username='${username}';`
        const groupDetailsQry=`select G.group_name from student S,usergroups UG,\`groups\` G where UG.student_prn=S.prn and UG.group_id=G.group_id and S.username="${username}";`
        const studentDetailsQryRes = await pool.query(studentDetailsQry)
        const gruopDetailsQryRes = await pool.query(groupDetailsQry)
        const studentDetails=studentDetailsQryRes[0][0]
        var groupList=[]
        gruopDetailsQryRes.forEach(item=>{
            item.forEach(innerItem=>{
                if (innerItem.group_name) {
                    groupList.push(innerItem.group_name);
                }
            })
        })
        response.status(StatusCodes.OK).json({
            studentDetails:studentDetails,
            groupList:groupList
        });


    } catch (error) {
        console.log(error);
        response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({message:"Something went wrong"});
    }
}