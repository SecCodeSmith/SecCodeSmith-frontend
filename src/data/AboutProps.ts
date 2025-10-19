import { API_BASE_URL } from '../Config';
import type { AboutProps } from '../untils/AboutProps'

export async function fetchAboutProps(): Promise<AboutProps> {
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
    const about = await res.json() as AboutProps;
    return about;
}    