import { StatusCodes } from "http-status-codes";
import { connection } from "../../../index.js";






export function getDashboard(request, response) {
  try {
    const username = request.user.username;
    const GetStudentDetailsQry = `select prn,first_name from student where username=?`;
    connection.query(GetStudentDetailsQry, [username], (error, result) => {
      if (error) {
        console.error(error);
        return response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: "Database error" });
      }
      if (result.length === 0) {
        return response
          .status(StatusCodes.NOT_FOUND)
          .send({ message: "User not found" });
      }
      const [prn, first_Name] = result[0];
      // fetch user-created/uploaded notes
      const FetchUserNotesQry = `select note_id,title,type,text,pdf_url,created_ad from notes where created_by=${prn}`
      const FetchGroupNotesQry = `select N.id, N.title, N.type, N.text, N.pdf_url, N.created_at from notes N, NotesGroups NG, UserGroups UG where N.note_id=NG.note_id and NG.group_id = ug.group_id and UG.student_prn=${prn}`;

      connection.query(FetchUserNotesQry, (error1, selfNote) => {
        if (error1) {
          console.error(error1);
          return response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Error Fetching data" })
        }
        connection.query(FetchGroupNotesQry, (error2, groupNote) => {
          if (error2) {
            console.error(error2);
            return response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({message:"Error Fetching data"})
          }

          return response
          .status(StatusCodes.OK)
          .send({
            message:`${first_Name}`,
            selfNotes:selfNote,
            groupNotes:groupNote
          })
        })
      })
    })
  } catch (error) {
    console.error(error);
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Something went wrong" });
  }
}


