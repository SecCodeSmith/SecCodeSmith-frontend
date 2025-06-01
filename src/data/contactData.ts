import type {ContactProps} from '../untils/ContactProps'

export async function fetchContactData(): Promise<ContactProps> {
    const url = `${import.meta.env.BASE_URL}data/Contact.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch contact data: ${res.status}`);
    return res.json();
}