import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Book from "./Book";
import { ModalInputForm, ModalEditForm } from "./ModalForm";
import Loading from "./Loading";

import uuid from "react-uuid";
import axios from "axios";
import Swal from "sweetalert2";

const api = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}`;

const Table = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [isbn, setIsbn] = useState(0);
  const [id, setId] = useState(0);

  const nameRef = useRef();
  const priceRef = useRef();
  const isbnRef = useRef();

  const clearData = () => {
    setName("");
    setPrice(0);
    setIsbn(0);
    nameRef.current.value = "";
    priceRef.current.value = "";
    isbnRef.current.value = "";
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(api.concat("/db/query"));
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

  const saveNewData = async () => {
    try {
      const response = await axios.post(api.concat("/db/insert"), {
        name,
        price,
        isbn,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "บันทึกข้อมูลสำเร็จ",
          text: "บันทึกข้อมูลสินค้าลงในฐานข้อมูลสำเร็จ",
          icon: "success",
          timer: 1600,
          showConfirmButton: false,
        });
      }
      setTimeout(fetchData, 1100);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: e,
      });
    }
  };

  const deleteProduct = async (id, name) => {
    const { isConfirmed } = await Swal.fire({
      title: `ลบสินค้า`,
      html: `คุณต้องการยืนยันการลบสินค้า <b>"${name}"</b> ออกจากฐานข้อมูลไหม`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "ลบ",
      denyButtonText: `ยกเลิก`,
    });
    if (isConfirmed) {
      try {
        const response = await axios.delete(api.concat(`/db/delete/id=${id}`));
        // console.log(response);
        if (response.status === 200) {
          Swal.fire({
            title: "ลบข้อมูลสำเร็จ",
            text: "ลบข้อมูลสินค้าในฐานข้อมูลสำเร็จ",
            icon: "success",
            timer: 1600,
            showConfirmButton: false,
          });
        }
        setTimeout(fetchData, 1100);
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "error",
          text: e,
        });
      }
    }
  };

  const editProduct = async (id, name, price, isbn) => {
    try {
      const response = await axios.put(
        api.concat(
          `/db/update/id=${id}&name=${name}&price=${price}&isbn=${isbn}`
        )
      );
      console.log(response);
      if (response.status === 200) {
        Swal.fire({
          title: "แก้ไขข้อมูลสำเร็จ",
          text: "แก้ไขข้อมูลสินค้าในฐานข้อมูลสำเร็จ",
          icon: "success",
          timer: 1600,
          showConfirmButton: false,
        });
      }
      setTimeout(fetchData, 1100);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: e,
      });
    }
  };

  const validateData = (name = name, price = price, isbn = isbn) => {
    let isValid = false;
    let text = "";
    if (name === "" || name.length === 0) {
      text = "โปรดตั้งชื่อสินค้าก่อน";
    } else if (price <= 0 || price >= 100000) {
      text = "ตั้งราคาสินค้าผิดพลาดไม่สามารถตั้งราคานี้ได้";
    } else if (String(isbn).length < 8) {
      text = "รหัส ISBN ต้องมีความยาวมากว่า 8 ตัว";
    } else {
      isValid = true;
    }

    Swal.fire({
      title: "เกิดข้อผิดพลาด",
      text: text,
      icon: "error",
    });

    return isValid;
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="container-fluid">
          <div className="mt-5">
            <header className="text-center fw-bold fs-1">
              <i class="bi bi-table"></i> ตารางสินค้า
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
              data-bs-target="#modalInputForm"
              onClick={clearData}
            >
              <i class="bi bi-plus-lg"></i> <span>เพิ่มข้อมูล</span>
            </button>
          </div>

          <table className="mt-3 table d-table table-responsive table-bordered table-striped table-hover">
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
                <Book
                  key={uuid()}
                  {...item}
                  number={number + 1}
                  setName={setName}
                  setPrice={setPrice}
                  setIsbn={setIsbn}
                  deleteProduct={deleteProduct}
                  setId={setId}
                />
              ))}
            </tbody>
          </table>
        </section>
      )}
      <ModalInputForm
        name={name}
        price={price}
        isbn={isbn}
        setName={setName}
        setPrice={setPrice}
        setIsbn={setIsbn}
        saveNewData={saveNewData}
        validateData={validateData}
        nameRef={nameRef}
        priceRef={priceRef}
        isbnRef={isbnRef}
      />
      <ModalEditForm
        name={name}
        price={price}
        isbn={isbn}
        id={id}
        setName={setName}
        setPrice={setPrice}
        setIsbn={setIsbn}
        editProduct={editProduct}
        validateData={validateData}
        nameRef={nameRef}
        priceRef={priceRef}
        isbnRef={isbnRef}
      />
    </>
  );
};

export default Table;
