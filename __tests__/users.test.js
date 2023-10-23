const app = require("../app");
const request = require("supertest");
const { User, MyPlant, Plant } = require("../models");

const user1 = {
  email: "user.test@mail.com",
  username: "User Test",
  password: "usertest",
  birthday: new Date(),
  gender: "Male",
};

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
      request(app)
        .post("/users/register")
        .send(user)
        .expect(201)
        .then((response) => {
          expect(response.body).toBeInstanceOf(Object);
          expect(response.body).toHaveProperty("id", expect.any(Number));
          expect(response.body).toHaveProperty("email", user.email);
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
          expect(response.body).toHaveProperty(
            "message",
            expect.any("Email cannot be empty")
          );
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
          expect(response.body).toHaveProperty(
            "message",
            expect.any("Password cannot be empty")
          );
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
          expect(response.body).toHaveProperty(
            "message",
            expect.any("Account already exists")
          );
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
          expect(response.body).toHaveProperty(
            "message",
            expect.any("Invalid email format")
          );
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
        expect(response.body).toHaveProperty(
          "message",
          expect.any("Password must be at least 8 characters")
        );
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
        expect(response.body).toHaveProperty("message", "Invalid email/password");
        done()
        })
      .catch((err) => {
        done(err)
      })
  });
});
