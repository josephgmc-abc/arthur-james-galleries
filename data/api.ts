import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { dummyArtworks } from "./artworks";
import { dummyArtists } from "./artists";
import { dummyReports } from "./reports";
import { dummyExhibitions } from "./exhibitions";

export async function getArtworks() {
  try {
    const data = await client.fetch(groq`*[_type == "artwork"] | order(_createdAt desc) {
      "id": _id,
      "slug": slug.current,
      title,
      "artist": artist->name,
      year,
      "price": coalesce(estimate, price),
      "imageSrc": coalesce(images[0].asset->url, "/images/michael-matloka-4a7K9tI_XFs-unsplash.jpg")
    }`);
    return data && data.length > 0 ? data : dummyArtworks;
  } catch (e) {
    console.error(e);
    return dummyArtworks;
  }
}

export async function getArtists() {
  try {
    const data = await client.fetch(groq`*[_type == "artist"] | order(name asc) {
      "slug": slug.current,
      name,
      "bio": pt::text(bio),
      "imageSrc": coalesce(portrait.asset->url, "/images/jessica-pamp-JNTSoyb_bbw-unsplash.jpg")
    }`);
    return data && data.length > 0 ? data : dummyArtists;
  } catch (e) {
    console.error(e);
    return dummyArtists;
  }
}

export async function getReports() {
  try {
    const data = await client.fetch(groq`*[_type == "report"] | order(publishedAt desc) {
      "slug": slug.current,
      title,
      summary,
      "date": publishedAt,
      "pdfUrl": pdfFile.asset->url
    }`);
    return data && data.length > 0 ? data : dummyReports;
  } catch (e) {
    console.error(e);
    return dummyReports;
  }
}

export async function getExhibitions() {
  try {
    const data = await client.fetch(groq`*[_type == "exhibition"] | order(startDate desc) {
      "slug": slug.current,
      title,
      subtitle,
      location,
      "dates": startDate + " — " + coalesce(endDate, ""),
      type,
      "imageSrc": coalesce(image.asset->url, "/images/antenna-jqh0GEvuNBY-unsplash.jpg"),
      "description": pt::text(description)
    }`);
    return data && data.length > 0 ? data : dummyExhibitions;
  } catch (e) {
    console.error(e);
    return dummyExhibitions;
  }
}
