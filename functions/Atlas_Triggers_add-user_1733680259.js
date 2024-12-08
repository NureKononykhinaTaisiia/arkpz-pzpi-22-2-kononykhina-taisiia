exports = async function(payload) {
  const { name, email } = JSON.parse(payload.body.text());
  const db = context.services.get("mongodb-atlas").db("hobby-rent-hub");
  const collection = db.collection("users");
  
  const user = await collection.findOne({ email });
  if (user) {
    return { status: 409, body: "User already exists" };
  }

  await collection.insertOne({ name, email });
  return { status: 201, body: "User created successfully" };
};
