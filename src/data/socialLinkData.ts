import { type SocialLink } from "../untils/SocialLink";
import { API_BASE_URL } from "../Config";

export async function fetchSocialLinkData(): Promise<SocialLink[]> {
    const url = `${API_BASE_URL}/api/footer-links`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch skill card data: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as SocialLink[];
    return data;
}

