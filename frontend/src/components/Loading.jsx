const Loading = () => (
  <div className="text-center  position-absolute top-50 start-50 translate-middle">
    <div
      className="spinner-border text-primary"
      role="status"
      style={{ width: "8rem", height: "8rem" }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
    <h2 className="mt-3 fw-bold">กำลังโหลดข้อมูลอยู่กรุณารอสักครู่ ...</h2>
  </div>
);

export default Loading;
