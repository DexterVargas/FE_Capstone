import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
	projectId: import.meta.env.VITE_REACT_APP_SANITY_PROJECT_ID,
	dataset: 'production',
	apiVersion: '2023-04-20',
	token: import.meta.env.VITE_REACT_APP_SANITY_TOKEN,
	useCdn: false,
	ignoreBrowserTokenWarning: true
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);