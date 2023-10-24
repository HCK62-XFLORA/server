const request = require(`supertest`)

const { sequelize, Thread, User, Forum, Comment } = require(`../models`)

const { queryInterface } = sequelize

const { app } = require(`../app`)
const { hashPass } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")

const users = [
    {
        username: `gaw`,
        email: `gaw@mail.com`,
        password: hashPass(`gawgaw`),
        birthday: `10/15/2001`,
        gender: `Male`,
        badge: `Beginner`,
        point: 0
    },
    {
        username: `leg`,
        email: `leg@mail.com`,
        password: hashPass(`legleg`),
        birthday: `10/15/2001`,
        gender: `Male`,
        badge: `Beginner`,
        point: 0
    }
]

let tokenUser0;
const invalidTokenUser0 = generateToken({ id: 999999999999999 })

let tokenUser1;
let invalidTokenUser1 = generateToken({ id: 999999999999998 })


const io = require("socket.io-client");
const { io: server } = require("../app");
beforeAll((done) => {
    User.create(users[0])
    .then((newUser) => {
        tokenUser0 = generateToken({ id: newUser.id })
        return User.create(users[1])
    })
    .then((newUser1) => {

        tokenUser1 = generateToken({ id: newUser1.id })
        return Forum.bulkCreate([
            {
                name: `Forum-1`,
                imgUrl: `https://google.com`
            },
            {
                name: `Forum-2`,
                imgUrl: `https://google.com`
            },
            {
                name: `Forum-3`,
                imgUrl: `https://google.com`
            }
        ])
    })
    .then((newForum) => {
        return Thread.bulkCreate([
            {
                UserId: 1,
                imgUrl: `https://google.com`,
                content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente optio eaque veniam sint nam quia maiores? Iste recusandae fugiat laboriosam nobis accusantium repellat tenetur sapiente odio id, veniam voluptatem consequuntur aperiam impedit. Harum reprehenderit laborum voluptatem dicta, nam voluptatibus, cum sed, excepturi expedita neque qui. Architecto, sapiente dolorum. Quod, vitae.`,
                ForumId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                UserId: 1,
                imgUrl: `https://google.com`,
                content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente optio eaque veniam sint nam quia maiores? Iste recusandae fugiat laboriosam nobis accusantium repellat tenetur sapiente odio id, veniam voluptatem consequuntur aperiam impedit. Harum reprehenderit laborum voluptatem dicta, nam voluptatibus, cum sed, excepturi expedita neque qui. Architecto, sapiente dolorum. Quod, vitae.`,
                ForumId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                UserId: 1,
                imgUrl: `https://google.com`,
                content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente optio eaque veniam sint nam quia maiores? Iste recusandae fugiat laboriosam nobis accusantium repellat tenetur sapiente odio id, veniam voluptatem consequuntur aperiam impedit. Harum reprehenderit laborum voluptatem dicta, nam voluptatibus, cum sed, excepturi expedita neque qui. Architecto, sapiente dolorum. Quod, vitae.`,
                ForumId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                UserId: 1,
                imgUrl: `https://google.com`,
                content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente optio eaque veniam sint nam quia maiores? Iste recusandae fugiat laboriosam nobis accusantium repellat tenetur sapiente odio id, veniam voluptatem consequuntur aperiam impedit. Harum reprehenderit laborum voluptatem dicta, nam voluptatibus, cum sed, excepturi expedita neque qui. Architecto, sapiente dolorum. Quod, vitae.`,
                ForumId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                UserId: 1,
                imgUrl: `https://google.com`,
                content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente optio eaque veniam sint nam quia maiores? Iste recusandae fugiat laboriosam nobis accusantium repellat tenetur sapiente odio id, veniam voluptatem consequuntur aperiam impedit. Harum reprehenderit laborum voluptatem dicta, nam voluptatibus, cum sed, excepturi expedita neque qui. Architecto, sapiente dolorum. Quod, vitae.`,
                ForumId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    })
    .then(() => {
        return Comment.bulkCreate([
            {
                UserId: 1,
                ThreadId: 1,
                comment: `Architecto, sapiente dolorum. Quod, vitae.`
            },
            {
                UserId: 1,
                ThreadId: 1,
                comment: `Architecto, sapiente dolorum. Quod, vitae.`
            },
            {
                UserId: 1,
                ThreadId: 1,
                comment: `Architecto, sapiente dolorum. Quod, vitae.`
            },
            {
                UserId: 1,
                ThreadId: 1,
                comment: `Architecto, sapiente dolorum. Quod, vitae.`
            },
            {
                UserId: 1,
                ThreadId: 1,
                comment: `Architecto, sapiente dolorum. Quod, vitae.`
            },
            {
                UserId: 1,
                ThreadId: 1,
                comment: `Architecto, sapiente dolorum. Quod, vitae.`
            }
        ])
    })
    .then((_) => {
        done()
    })
    .catch((error) => {
        console.log(error)
        done(error)
    })
})

afterAll((done) => {
  Thread.destroy({ truncate: true, cascade: true, restartIdentity: true })
  .then(() => {
      return Forum.destroy({ truncate: true, cascade: true, restartIdentity: true })
  })
  .then(() => {
      return User.destroy({ truncate: true, cascade: true, restartIdentity: true })
  })
  .then(() => {
      done()
  })
  .catch((error) => {
      console.log(error)
  })
})

describe("Suite of unit tests", function() {
  server.attach(3010);
  let socket;
  

  beforeEach(function(done) {
    // Setup
    socket = io("http://localhost:3010");

    socket.on("connect", function() {
      console.log("worked...");
      socket.emit("joinRoom", { ThreadId: 1 })
      done();
    });
    socket.on("disconnect", function() {
      console.log("disconnected...");
    });
  });

  afterEach(function(done) {
    // Cleanup
    if (socket.connected) {
      console.log("disconnecting...");
      socket.disconnect();
    } else {
      // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
      console.log("no connection to break...");
    }
    done();
  });

  afterAll(function(done) {
    socket.disconnect();
    server.close();
    done();
  });

  describe("Chat tests", function() {
    test("should work", (done) => {
      //join emit room

      socket.emit("clientMessage", {
        ThreadId: 1,
        comment: "Hello world",
        UserId: 1,
      });


      socket.on("serverMessage", (payload) => {
        try {
          expect(payload).toHaveProperty("ThreadId");
          expect(payload).toHaveProperty("comment");
          expect(payload).toHaveProperty("UserId");
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });
});