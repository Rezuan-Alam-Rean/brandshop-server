const express =require('express');
const cors = require('cors');
const app = express();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port =process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('brand shop server is running');
})
app.use(cors());
app.use(express.json()) 





const uri = `mongodb+srv://brand-shop:IHU5wFxqIMRlWWjq@cluster0.ndxdp2s.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

const productCollection = client.db("brand-shop").collection("product");
const cartCollection = client.db("brand-shop").collection("myCart");



app.get("/products", async (req, res) => {
 
    const result = await productCollection.find().toArray();
    res.send(result);
    // console.log(result);
  });

  app.get("/product/:id", async (req, res) => {
    const id = req.params.id;
   
    const query = { _id: new ObjectId(id) };
    const result = await productCollection.findOne(query);
    res.send(result);
  });
  app.post("/post/product", async (req, res) => {
    const body = req.body;
    console.log(body);
    const result = await productCollection.insertOne(body);
    res.send(result);
  });

  app.post("/selectedProduct", async (req, res) => {
    const body = req.body;
    console.log(body);
    const result = await cartCollection.insertOne(body);
    res.send(result);
  });

  app.get("/myCart", async (req, res) => {
 
    const result = await cartCollection.find().toArray();
    res.send(result);
    // console.log(result);
  });


  app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) };
    const result = await cartCollection.deleteOne(query);
    res.send(result);
  });








    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.listen(port,()=>{
    console.log(`brand shop is runing on port:${port}`);
})