const Input = ({ text, type, set, isNumber, value, inputRef }) => (
  <div className="mt-3 mb-1 fs-5">
    <label className="text-uppercase">{text}: </label>
    <input
      type={type}
      value={value}
      ref={inputRef}
      className="form-control"
      onChange={(e) =>
        isNumber ? set(parseInt(e.target.value)) : set(e.target.value)
      }
    />
  </div>
);

export const ModalInputForm = ({
  name,
  price,
  isbn,
  setName,
  setPrice,
  setIsbn,
  saveNewData,
  validateData,
  nameRef,
  priceRef,
  isbnRef
}) => {
  return (
    <div className="modal" id="modalInputForm" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">เพิ่มข้อมูลสินค้า</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4">
            <Input
              text={"ชื่อหนังสือ"}
              type={"text"}
              set={setName}
              inputRef={nameRef}
              isNumber={false}
              value={undefined}
            />
            <Input
              text={"ราคาสินค้า"}
              type={"number"}
              set={setPrice}
              inputRef={priceRef}
              isNumber={true}
              value={undefined}
            />
            <Input
              text={"isbn"}
              type={"number"}
              set={setIsbn}
              inputRef={isbnRef}
              isNumber={true}
              value={undefined}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              ปิด
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() => {
                if (validateData(name, price, isbn)) {
                  saveNewData();
                }
              }}
            >
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalEditForm = ({
  name,
  price,
  isbn,
  id,
  setName,
  setPrice,
  setIsbn,
  editProduct,
  validateData,
  nameRef,
  priceRef,
  isbnRef
}) => {
  return (
    <div className="modal" id="modalEditForm" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">แก้ไขข้อมูลสินค้า</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4">
          <Input
              text={"ชื่อหนังสือ"}
              type={"text"}
              set={setName}
              inputRef={nameRef}
              isNumber={false}
              value={name}
            />
            <Input
              text={"ราคาสินค้า"}
              type={"number"}
              set={setPrice}
              inputRef={priceRef}
              isNumber={true}
              value={price}
            />
            <Input
              text={"isbn"}
              type={"number"}
              set={setIsbn}
              inputRef={isbnRef}
              isNumber={true}
              value={isbn}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              ปิด
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() => {
                if (validateData(name, price, isbn)) {
                  editProduct(id, name, price, isbn);
                }
              }}
            >
              แก้ไข
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
