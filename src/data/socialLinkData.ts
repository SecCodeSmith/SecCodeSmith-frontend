import { type SocialLink } from "../utils/SocialLink";
import { USE_API, API_BASE_URL, STATIC_DATA_URL } from "../Config";

export async function fetchSocialLinkData(): Promise<SocialLink[]> {
    if (USE_API) {
        const url = `${API_BASE_URL}/api/footer-links`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch social link data: ${response.status} ${response.statusText}`);
        }

        return (await response.json()) as SocialLink[];
    } else {
        const url = `${STATIC_DATA_URL}/SocialLink.json`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch static social link data: ${res.status} ${res.statusText}`);
        }
        return res.json() as Promise<SocialLink[]>;
    }
}
