import request from "supertest";
import app from "../../app";
import { handleConnectToMongoServer } from "../../utils/mongoMemoryServer ";
import { UserType } from "../../schemas/userValidation.schema";


// Connect to mongo-memory-server
handleConnectToMongoServer();


describe("User API endpoints", () => {
  let userId: string;
  const usersControllers = jest.fn() as jest.Mock<UserType>;
  beforeAll(async () => {
    // Add any setup logic here
  });
  describe("GET /api/users should return list of users", () =>{

    it("GET /api/users should return list of users", async () => {
      const response = await request(app).get("/api/users").expect(200);

      console.log(response.body.data)
      
      expect(response.body.data).toBeDefined();
    });
  })


  it("POST /api/users should create a new user", async () => {

    const MOCK_USER:UserType = { username: 'Hello it', password: "Songvatgg", age: 8}

    const response = await request(app)
      .post("/api/users")
      .send(MOCK_USER)
      .expect(201)
      .expect("Content-Type", "application/json; charset=utf-8");
    
    userId = response.body.data._id;
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toEqual("POST success");
    expect(response.body.data.username).toEqual(MOCK_USER.username);
    expect(response.body.data.age).toEqual(MOCK_USER.age);
  });

  describe("UPDATE /api/users/:id should update a user", () =>{
     it("should update and return a user", async () =>{
      const MOCK_USER = { username: "Hello guys what is your name", age: 5}
        
      const response = await request(app).patch(`/api/users/${userId}`).send(MOCK_USER).expect(201);


      console.log(response.body)
      expect(response).toBeDefined()
      expect(response.body.username).toEqual("Hello guys what is your name");
      expect(response.body.data.age).toEqual(5)

     },20000)
  } )


  it("DELETE /api/users/:id should delete a user", async () => {
    const response = await request(app).delete(`/api/users/${userId}`).expect(200);

    expect(response.body.message).toEqual('DELETE successfully!');
  },20000);

  afterAll(async () => {
    // Add any teardown logic here
  });
});
