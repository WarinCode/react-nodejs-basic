import React from "react";

const Book = ({
  id,
  isbn,
  name,
  price,
  number,
  deleteProduct,
  setId,
  setName,
  setPrice,
  setIsbn,
}) => {
  const getState = () => {
    setName(name);
    setPrice(price);
    setIsbn(isbn);
    setId(id);
  };

  return (
    <tr id="list" className="text-center fs-5">
      <td>{number}</td>
      <td className="text-start">{name}</td>
      <td>{price}</td>
      <td>{id}</td>
      <td>{isbn}</td>
      <td className="text-center">
        <button
          type="button"
          className="btn btn-primary me-2"
          data-bs-toggle="modal"
          data-bs-target="#modalEditForm"
          onClick={getState}
        >
          <i class="bi bi-pencil-square"></i> <span>แก้ไข</span>
        </button>
        <button
          type="button"
          className="btn btn-danger ms-2"
          onClick={() => deleteProduct(id, name)}
        >
          <i class="bi bi-trash-fill"></i> <span>ลบ</span>
        </button>
      </td>
    </tr>
  );
};

export default Book;
