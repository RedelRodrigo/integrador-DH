import { MongoClient } from "mongodb";

const MONGODB_URI = "mongodb://localhost:27017/";
const DB_NAME = "digital_money_house";

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("✅ Conectado a MongoDB");

    const db = client.db(DB_NAME);
    const featuresCollection = db.collection("features");
    const imagesCollection = db.collection("images");

    // Limpiar colecciones
    await featuresCollection.deleteMany({});
    await imagesCollection.deleteMany({});
    console.log("🗑️  Colecciones limpiadas");

    // Insertar features
    const features = [
      {
        title: "Transferí dinero",
        description:
          "Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como también recibir transferencias y nuclear tu capital en nuestra billetera virtual",
        image:
          "https://res.cloudinary.com/dbdyokfnc/image/fetch/w_400,h_300,c_fill/https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400",
      },
      {
        title: "Pago de servicios",
        description:
          "Pagá mensualmente los servicios en 3 simples clicks. Facil, rápido y conveniente. Olvidate de las facturas en papel",
        image:
          "https://res.cloudinary.com/dbdyokfnc/image/fetch/w_400,h_300,c_fill/https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
      },
    ];

    const resultFeatures = await featuresCollection.insertMany(features);
    console.log(`✅ ${resultFeatures.insertedCount} features insertados`);

    // Insertar imagen de fondo
    const imageDoc = {
      chica_bg_link:
        "https://res.cloudinary.com/dbdyokfnc/image/upload/v1776789376/chica_veejgb.svg",
    };

    await imagesCollection.insertOne(imageDoc);
    console.log(`✅ Imagen de fondo insertada`);

    console.log("\n📋 Datos insertados correctamente");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await client.close();
  }
}

seedDatabase();
