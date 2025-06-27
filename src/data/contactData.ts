import { API_BASE_URL } from '../Config'
import type {ContactProps} from '../untils/ContactProps'

export async function fetchContactData(): Promise<ContactProps> {
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
  const contact = await res.json() as ContactProps;
  return contact;
}