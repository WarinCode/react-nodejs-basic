const Input = ({ text, type }) => (
    <div className="mt-3 mb-1 fs-5">
        <label>{text}: </label>
        <input type={type} className="form-control" minLength={4} maxLength={6} required/>
    </div>
)

const ModalForm = () => {
  return (
    <div className="modal" id="modalForm" tabIndex="-1">
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
            <Input text={"ชื่อหนังสือ"} type={"text"}/>
            <Input text={"ราคาสินค้า"} type={"number"}/>
            <Input text={"isbn"} type={"number"}/>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              ปิด
            </button>
            <button type="button" className="btn btn-primary">
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
