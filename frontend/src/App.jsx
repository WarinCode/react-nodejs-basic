import { Link } from "react-router-dom"

const App = () => {
  return (
    <>
      <Link to={"/book"}>
        <button type="button" className="btn btn-primary rounded w-25 mt-5 ms-5"><i class="bi bi-table"></i> ดูตารางสินค้า</button>
      </Link>
    </>
  )
}

export default App;