import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Artwork, Artist, Report, Exhibition } from "./types";
export async function getArtworks(): Promise<Artwork[]> {
  try {
    const data = await client.fetch(groq`*[_type == "artwork"] | order(
      artist->name == "Freddie Peacock" desc,
      artist->name == "Chima Padua" desc,
      artist->name asc,
      _createdAt asc
    ) {
      "id": _id,
      "slug": slug.current,
      title,
      "artist": artist->name,
      "artistFeatured": artist->featured,
      year,
      medium,
      dimensions,
      "provenance": pt::text(provenance),
      "price": coalesce(estimate, price, "Price on Request"),
      "imageSrc": coalesce(images[0].asset->url, "/images/michael-matloka-4a7K9tI_XFs-unsplash.jpg"),
      featured,
      status,
      lotNumber,
      source
    }`);
    return data || [];
  } catch (e) {
    console.error("Error fetching artworks from Sanity:", e);
    return [];
  }
}

export async function getArtists(): Promise<Artist[]> {
  try {
    const data = await client.fetch(groq`*[_type == "artist"] | order(featured desc, name asc) {
      "slug": slug.current,
      name,
      "bio": pt::text(bio),
      "imageSrc": coalesce(portrait.asset->url, "/images/jessica-pamp-JNTSoyb_bbw-unsplash.jpg"),
      "artworkThumbnail": coalesce(
        *[_type == "artwork" && artist._ref == ^._id && title match "*Calvin Klein*"][0].images[0].asset->url,
        *[_type == "artwork" && artist._ref == ^._id && title match "*Betelgeuse*"][0].images[0].asset->url,
        *[_type == "artwork" && artist._ref == ^._id][0].images[0].asset->url
      ),
      featured
    }`);
    return data || [];
  } catch (e) {
    console.error("Error fetching artists from Sanity:", e);
    return [];
  }
}

export async function getReports(): Promise<Report[]> {
  try {
    const data = await client.fetch(groq`*[_type == "report"] | order(publishedAt desc) {
      "slug": slug.current,
      title,
      summary,
      "date": publishedAt,
      "pdfUrl": pdfFile.asset->url
    }`);
    
    if (data && data.length > 0) {
      return data.map((report: any) => {
        const dateObj = new Date(report.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }).toUpperCase();
        
        return {
          ...report,
          date: formattedDate
        };
      });
    }
    return [];
  } catch (e) {
    console.error("Error fetching reports from Sanity:", e);
    return [];
  }
}

export async function getExhibitions(): Promise<Exhibition[]> {
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
    return data || [];
  } catch (e) {
    console.error("Error fetching exhibitions from Sanity:", e);
    return [];
  }
}
