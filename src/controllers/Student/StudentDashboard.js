import { StatusCodes } from "http-status-codes";
import { connection } from "../../../index.js";


export function getDashboard(request, response) {
  try {
    const reqUsername = request.user.username;
    const GetStudentDetailsQry = `select prn,first_name from student where username=?`;
    connection.query(GetStudentDetailsQry, [reqUsername], (error, result) => {
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
      const prn = result[0].prn;
      const first_name = result[0].first_name;
      // fetch user-created/uploaded notes
      const FetchUserNotesQry = `select N.note_id, N.title,N.type,N.text,S.first_name,N.created_at,C.category_name,N.pdf_url from student S, notes N,categories C where N.created_by=S.prn and C.category_id=N.category_id and S.username='${reqUsername}'`
      const FetchGroupNotesQry = `select N.note_id, N.title,N.type,N.text,S.first_name,N.created_at,C.category_name,N.pdf_url from student S, notes N, NotesGroups NG, UserGroups UG, categories C where N.note_id=NG.note_id and NG.group_id = ug.group_id and N.created_by=S.prn and C.category_id=N.category_id and UG.student_prn=${prn}`;

      const unionQuery = `${FetchUserNotesQry} union ${FetchGroupNotesQry}`
      connection.query(unionQuery, (error, result) => {
        if(!error){
          response
          .status(StatusCodes.OK)
          .send({
            first_name:first_name,
            notesList:result
          })
        }
      })
    })
  } catch (error) {
    console.error(error);
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Something went wrong" });
  }
}


