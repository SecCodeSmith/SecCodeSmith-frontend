import type {AboutProps} from '../untils/AboutProps'

const url = `${import.meta.env.BASE_URL}data/AboutProps.json`;
const res = await fetch(url);
if (!res.ok) throw new Error(`Failed to fetch about props: ${res.status}`);

export const aboutProps: AboutProps = await res.json();