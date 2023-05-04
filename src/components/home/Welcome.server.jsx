import {useShopQuery, flattenConnection} from '@shopify/hydrogen';
import gql from 'graphql-tag';

function CallToAction({url, label}) {
  return (
    <a
      href={url}
      target="_self"
      className="border-white border py-2 px-5 rounded-full inline-flex items-center hover:bg-black hover:border-black"
    >
      {label}
    </a>
  );
}

/**
 * A server component that displays the content on the homepage of the Hydrogen app
 */
export default function Welcome() {
  const {data} = useShopQuery({query: QUERY, preload: true});
  const collections = data && flattenConnection(data.collections);
  const firstCollection = collections[0] ? collections[0].handle : '';

  return (
    <div className="banner-home text-black p-32 md:p-60 px-4 xl:px-40">
      <div className="text-center">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 text-white border-white uppercase">
          <CallToAction
            url={`/collections/${firstCollection}`}
            label="Shop Collection"
          />
        </div>
      </div>
    </div>
  );
}

const QUERY = gql`
  query welcomeContent {
    collections(first: 3) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;
