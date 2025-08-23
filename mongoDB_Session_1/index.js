const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017"; // local MongoDB
const client = new MongoClient(url);
async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    const db = client.db("mongoDB_Session_1");
    const users = db.collection("users");
    const tasks = db.collection("tasks");
    // 1. Insert Users
    await users.insertMany([
      { _id: 1, name: "blen", email: "blenber01@gmail.com" },
      { _id: 2, name: "miheret", email: "miheret02@gmail.com" },
    ]);
    console.log("✅ Users inserted");
    // 2. Insert Tasks
    await tasks.insertMany([
      {
        title: "Build API",
        assignedTo: 1,     
        status: "pending",
        tags: ["backend", "api"],
      },
      {
        title: "Write Docs",
        assignedTo: 2,
        status: "done",
        tags: ["documentation"],
      },
      {
        title: "Fix Bugs",
        assignedTo: 1,
        status: "pending",
        tags: ["bugfix", "urgent"],
      },
    ]);
    console.log("✅ Tasks inserted");
    // 3. Query Operations
    console.log("All Users:", await users.find().toArray());
    console.log(
      "Tasks for User 1:",
      await tasks.find({ assignedTo: 1 }).toArray()
    );
    console.log(
      "Completed Tasks:",
      await tasks.find({ status: "done" }).toArray()
    );
    console.log(
      "Only Task Titles:",
      await tasks.find({}, { projection: { title: 1, _id: 0 } }).toArray()
    );
    // 4. Update Operations
    await users.updateOne(
      { name: "blen" },
      { $set: { email: "blen.new@gmail.com" } }
    );
    await tasks.updateMany(
      { status: "pending" },
      { $set: { status: "in progress" } }
    );
    await tasks.updateOne(
      { title: "Build API" },
      { $push: { tags: "review" } }
    );
    console.log("✅ Updates done");
    // 5. Delete Operations
    await users.deleteOne({ name: "miheret" });
    await tasks.deleteMany({ status: "done" });
    console.log("✅ Deletes done");
  } catch (err) {
    console.error(err);  } finally {
    await client.close();
    console.log("🔌 Connection closed");
  }
}
run();
