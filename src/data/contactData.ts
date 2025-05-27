import type {ContactProps} from '../untils/ContactProps'

const url = `${import.meta.env.BASE_URL}data/Contact.json`;
const res = await fetch(url);
if (!res.ok) throw new Error(`Failed to fetch blog posts: ${res.status}`);

export const contactData: ContactProps = await res.json();