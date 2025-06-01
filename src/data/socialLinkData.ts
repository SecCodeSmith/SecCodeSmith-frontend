import { type SocialLink } from "../untils/SocialLink";

export async function fetchSocialLinkData(): Promise<SocialLink[]> {
    const url = `${import.meta.env.BASE_URL}data/SocialLink.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch skill card data: ${res.status}`);

    return res.json();
}

