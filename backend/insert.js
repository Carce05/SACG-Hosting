const {MongoClient} = require ("mongodb");


const uri = 'mongodb+srv://LCDG:Lcdg123.@cluster0.pvrl9qx.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("LDG");
    const usuarios = database.collection("Usuarios");
    // Insert de prueba
    const doc = {
      title: "Hola Mundo",
      content: "Testeo",
    }
    const result = await usuarios.insertOne(doc);
  } finally {
    
    await client.close();
  }
}
run().catch(console.dir);