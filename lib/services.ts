import { getDatabase } from "./mongodb";

export interface Feature {
  _id?: string;
  title: string;
  description: string;
  image?: string;
}

export async function getFeatures(): Promise<Feature[]> {
  try {
    const db = await getDatabase();
    const features = await db.collection("features").find({}).toArray();

    return features.map((feature: any) => ({
      _id: feature._id?.toString(),
      title: feature.title,
      description: feature.description,
      image: feature.image,
    }));
  } catch (error) {
    console.error("❌ Error obteniendo features:", error);
    return [];
  }
}

export async function getBackgroundImage(): Promise<string> {
  try {
    const db = await getDatabase();
    const imageDoc = await db.collection("images").findOne();

    return imageDoc?.chica_bg_link || "";
  } catch (error) {
    console.error("❌ Error obteniendo imagen de fondo:", error);
    return "";
  }
}
