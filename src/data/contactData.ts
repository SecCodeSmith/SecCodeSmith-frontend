import { USE_API, API_BASE_URL, STATIC_DATA_URL } from '../Config'
import type {ContactProps} from '../utils/ContactProps'

export async function fetchContactData(): Promise<ContactProps> {
  if (USE_API) {
    const url = `${API_BASE_URL}/api/contact`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch contact data: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<ContactProps>;
  } else {
    const url = `${STATIC_DATA_URL}/Contact.json`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch static contact data: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<ContactProps>;
  }
}