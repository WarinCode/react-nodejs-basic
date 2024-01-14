class Random {
  static getId = (length = 3) => {
    const { random, floor } = Math;
    const array = [];
    for(let i = 0; i < length; i++){
      array.push(floor((random() * 9)));
    }
    return parseInt(array.join(""));
  }
}

export default class Controller {
  constructor(client) {
    this.client = client;
    this.params = {
      id: ":id",
      name: ":name",
      price: ":price",
      isbn: ":isbn",
    };
    this.apiRoutes = {
      GET: "/db/query",
      POST: "/db/insert",
      UPDATE: `/db/update/id=${this.params.id}&name=${this.params.name}&price=${this.params.price}&isbn=${this.params.isbn}`,
      DELETE: `/db/delete/id=${this.params.id}`,
    };
    this.result = null;
    this.data = null;
  }

  //* read
  getData = async (req, res) => {
    const { rows } = await this.client.query("SELECT * FROM tb_book");
    this.result = rows;
    res.json([...this.result]);
  };

  //* create
  addData = async (req, res) => {
    const { name, price, isbn } = req.body;
    this.data = [name, price, isbn, Random.getId()];
    this.result = await this.client.query(
      "INSERT INTO tb_book(name, price, isbn, id) VALUES($1, $2, $3, $4)",
      this.data
    );
    res.send(this.result);
  };

  //* update
  updateData = async (req, res) => {
    const { id, name, price, isbn } = req.params;
    this.data = [name, price, isbn, id];
    this.result = await this.client.query(
      "UPDATE tb_book SET name = $1, price = $2, isbn = $3 WHERE id = $4",
      this.data
    );
    res.send(this.result);
  };

  //* delete
  deleteData = async (req, res) => {
    this.result = await this.client.query("DELETE FROM tb_book WHERE id = $1", [
      req.params.id,
    ]);
    let isSuccess = this.result.rowCount == 1;
    res.send(isSuccess);
  };
}
