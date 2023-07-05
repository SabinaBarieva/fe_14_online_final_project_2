import { MongoClient, ServerApiVersion } from 'mongodb';

const uri =
  'mongodb+srv://oleksandrakorkh:mwPwEVHmnGXKTdWm@cluster0.svplfkl.mongodb.net/?retryWrites=true&w=majority';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    const db = await client.db('store-configurations');
    const configsCollection = await db.collection('global-configs');
    const newConfig = {
      email: {
        mailUser: 'sensor.store1@gmail.com',
        mailPassword: 'sensorstore',
        mailService: 'gmail',
      },
    };

    const result = await configsCollection.insertOne(newConfig);
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
