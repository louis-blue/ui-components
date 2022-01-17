import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { withConsole } from "@storybook/addon-console";
import rtlPlugin from "stylis-plugin-rtl";

let cacheRtl;
if (localStorage.getItem("dir") === "rtl") {
  cacheRtl = createCache({
    key: "direction",
    stylisPlugins: [rtlPlugin]
  });
} else {
  cacheRtl = createCache({
    key: "direction"
  });
}

export const decorators = [
  Story => (
    <CacheProvider value={cacheRtl}>
      <Story />
    </CacheProvider>
  ),
  (Story, context) => withConsole()(Story)(context)
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
