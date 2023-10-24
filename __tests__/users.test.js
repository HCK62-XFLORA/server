const { app } = require("../app");
const request = require("supertest");
const { User, MyPlant, Plant } = require("../models");
const { hashPass } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

const user1 = {
  email: "user.test@mail.com",
  username: "User Test",
  password: hashPass(`testestes`),
  birthday: new Date(),
  gender: "Male",
};

const plants = require(`../data/plants.json`).map((plant) => {

  delete plant.id
  plant.createdAt = new Date()
  plant.updatedAt = new Date()
  return plant
})

let access_token;
let fake_access_token = generateToken({ id: 999999999999999999 })

beforeAll((done) => {
  User.create(user1)
  .then((newUser) => {
    access_token = generateToken({ id: newUser.id })
    return Plant.bulkCreate(plants)
  })
  .then(() => {
    return MyPlant.bulkCreate([
      {
        UserId: 1,
        PlantId: 1,
        imgUrl: `http://google.com`
      },
      {
        UserId: 1,
        PlantId: 2,
        imgUrl: `http://google.com`
      }
    ])
  })
  .then(() => {
    done()
  })
  .catch(console.log)
})

afterAll((done) => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then((_) => {
      return Plant.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    })
    .then((_) => {
      return MyPlant.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("User Routes Test", () => {
  describe("POST /users/register - create new user", () => {
    test("201 Success register - should create new User", (done) => {
      user1.email = "test2@mail.com"
      request(app)
        .post("/users/register")
        .send(user1)
        .expect(201)
        .then((response) => {
          expect(response.body).toBeInstanceOf(Object);
          expect(response.body).toHaveProperty("id", expect.any(Number));
          expect(response.body).toHaveProperty("email", user1.email);
          expect(response.body).not.toHaveProperty("password");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("400 Failed register - should return error if email is null", (done) => {
      request(app)
        .post("/users/register")
        .send({
          password: "qweqwe",
        })
        .expect(400)
        .then((response) => {
          expect(response.body).toBeInstanceOf(Object);
          expect(response.body).toHaveProperty("message", "Email cannot be empty");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("400 Failed register - should return error if password is null", (done) => {
      request(app)
        .post("/users/register")
        .send({
          email: "user2@mail.com",
        })
        .expect(400)
        .then((response) => {
          expect(response.body).toBeInstanceOf(Object);
          expect(response.body).toHaveProperty("message");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("400 Failed register - should return error if email is already exists", (done) => {
      request(app)
        .post("/users/register")
        .send(user1)
        .expect(400)
        .then((response) => {
          expect(response.body).toBeInstanceOf(Object);
          expect(response.body).toHaveProperty("message");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("400 Failed register - should return error if wrong email format", (done) => {
      request(app)
        .post("/users/register")
        .send({
          email: "random",
          username: "Sample User",
          password: "qweqwe",
          birthday: new Date(),
          gender: "Male",
        })
        .expect(400)
        .then((response) => {
          expect(response.body).toBeInstanceOf(Object);
          expect(response.body).toHaveProperty("message");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  test("400 Failed register - should return error if password less than 8 characters", (done) => {
    request(app)
      .post("/users/register")
      .send({
        email: "user2@mail.com",
        username: "user2",
        password: "qweqwe",
        birthday: new Date(),
        gender: "Male",
      })
      .expect(400)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /users/login - user login", () => {
  test("200 Success login - should return access_token", (done) => {
    request(app)
      .post("/users/login")
      .send(user1)
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 Failed login - should return error", (done) => {
    request(app)
      .post("/users/login")
      .send({
        email: "hello@mail.com",
        password: "salahpassword",
      })
      .expect(401)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "User not found");
        done()
        })
      .catch((err) => {
        done(err)
      })
  });
});

describe(`POST /users/predict`, () => {
  
  test(`Successfully get a plant's disease's prediction`, async() => {
    try {
      const response = await request(app)
      .post(`/users/predict`)
      .set(`access_token`, access_token)
      .attach(`image`, `./data/cherry.jpeg`)
      .expect(200)
        console.log(response.body)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty(`confidence`)
    } catch (error) {
      console.log(error)
    }
  })

  test(`Failed get a plant's disease's prediction`, async () => {
    try {
      const response = await request(app)
      .post(`/users/predict`)
      .set(`access_token`, access_token)
      .attach(`image`, `./data/plants.json`)
      .expect(200)
        console.log(response.body)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty(`confidence`)
    } catch (error) {
      console.log(error)
    }
  })
})
