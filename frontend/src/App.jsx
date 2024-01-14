import { Link } from "react-router-dom"

const App = () => {
  return (
    <>
      <Link to={"/book"}>
        <button type="button" className="btn btn-primary">ไปที่ตาราง</button>
      </Link>
    </>
  )
}

export default App;