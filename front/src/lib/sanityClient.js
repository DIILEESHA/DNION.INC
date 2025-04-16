import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: "snti8zdm",
    dataset: "production",
    useCdn: false, // <== set this to false for real-time fetch
    apiVersion: "2024-01-01",
});


const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);