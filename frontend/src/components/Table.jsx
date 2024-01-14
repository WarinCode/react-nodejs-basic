import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Book from "./Book";
import ModalForm from "./ModalForm";
import Loading from "./Loading";

import uuid from "react-uuid";
import axios from "axios";
import Swal from "sweetalert2";

const api = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/db/`;

const Table = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(api.concat("query"));
      setBooks(await response.data);
      setLoading(false);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: e,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <section className="container-fluid">
          <div className="mt-5 ">
            <header className="text-center fw-bold fs-1">
              ตารางสินค้า
            </header>
          </div>

          <div className="btn-group my-4">
            <Link to={"/"}>
              <button type="button" className="btn btn-secondary">
                <i class="bi bi-arrow-left me-1"></i> <span>กลับหน้าหลัก</span>
              </button>
            </Link>

            <button
              className="btn btn-success ms-2 rounded"
              data-bs-toggle="modal"
              data-bs-target="#modalForm"
            >
              <i class="bi bi-plus-lg"></i> <span>เพิ่มข้อมูล</span>
            </button>
          </div>

          <table className="mt-3 table table-bordered table-striped table-hover">
            <thead>
              <tr className="text-center fs-4 fw-bold text-primary ">
                <td>แถว</td>
                <td>ชื่อ</td>
                <td>ราคา</td>
                <td>รหัสสินค้า</td>
                <td className="text-uppercase">isbn</td>
                <td width="250px">จัดการ</td>
              </tr>
            </thead>
            <tbody>
              {books.map((item, number) => (
                <Book key={uuid()} {...item} number={number + 1} />
              ))}
            </tbody>
          </table>
        </section>
      )}

      <ModalForm />
    </>
  );
};

export default Table;
