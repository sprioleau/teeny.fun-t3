# /pages/api/{route}

Typically in a Next app, API routes are accessible within the client-side application via the `/pages/api/{route}`route.

However, it is not the case with this application. Since the app has a redirect service, it needs to be abel to perform redirects for urls in the form of `{PRODUCTION_URL}/:teenyCode`.

In order to acheive this, I updated `next.config.mjs` to rewrite the `/api/:teenyCode` route to `/:teenyCode`. A snippet showing this configuration is below.

```js
const config = {
  // ... other configuration options
  async rewrites() {
		return [
			{
        source: "/:teeny_code*",
				destination: "/api/:teeny_code*",
			},
		];
	},
};
export default config;
```

So, Next is rewriting `/:teeny_code*` to `/api/:teeny_code*` without a visible change in the URL to the user. Pretty cool! 😎 