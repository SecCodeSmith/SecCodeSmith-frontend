import {type SocialLink} from "../untils/SocialLink";

const url = `${import.meta.env.BASE_URL}data/SocialLink.json`;
const res = await fetch(url);
if (!res.ok) throw new Error(`Failed to fetch skill card data: ${res.status}`);

export const socialLinkData: SocialLink[] = await res.json();