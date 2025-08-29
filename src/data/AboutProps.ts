import { USE_API, API_BASE_URL, STATIC_DATA_URL } from '../Config';
import type { AboutProps } from '../utils/AboutProps'

export async function fetchAboutProps(): Promise<AboutProps> {
    if (USE_API) {
        const url = `${API_BASE_URL}/api/about`;
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors',
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch about props: ${res.status} ${res.statusText}`);
        }
        return res.json() as Promise<AboutProps>;
    } else {
        const url = `${STATIC_DATA_URL}/AboutProps.json`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch static about props: ${res.status} ${res.statusText}`);
        }
        return res.json() as Promise<AboutProps>;
    }
}