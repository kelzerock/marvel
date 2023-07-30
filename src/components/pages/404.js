import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
  console.log('page404')

  return(
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "200px",
      justifyContent: "space-between"
    }}>
      <ErrorMessage />
      <h2>Page doesn't exist!</h2>
      <Link to="/" >Back to main page</Link>
    </div>
  )
}


export default Page404;