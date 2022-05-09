// libs/util-testing/src/lib/mocks/handlers.ts
// import { RestResponse } from '@cmw-uc/models';
import { rest, RequestHandler } from 'msw';

// import { buildRestResponse } from './rest.mocks';

// const smallCharCountResponse = buildRestResponse(5);
// const largeCharCountResponse = buildRestResponse(20);
//     'https://rickandmortyapi.com/api/character/:state',

export const handlers: RequestHandler[] = [
  // mock the character list endpoint
  rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
    // check the `state` request param to determine what to return for our mocked response
    // the values of state are determined in our `characters-list-rest.stories.tsx`
    const { state } = req.params;
    switch (state) {
      case 'small-list': {
        // return a successful response after a 1.5sec delay to show our loading indicator
        return res(
          ctx.status(200),
          ctx.delay(1500),
          ctx.json({ results: [{ name: 'Rick' }, { name: 'Morty' }] })
        );
      }
      case 'error': {
        // return an error response of 404: Not Found
        return res(
          ctx.status(404),
          ctx.delay(1500),
          ctx.json({ errorMessage: 'Failure' })
        );
      }
      default: {
        // return a successful response after a 1.5sec delay to show our loading indicator
        return res(
          ctx.status(200),
          ctx.delay(1500),
          ctx.json({ results: [{ name: 'Rick' }, { name: 'Morty' }] })
        );
      }
    }
  }),
];
