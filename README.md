# \<mil-i18>

'mil-i18' is localization webcomponent.
It uses local translation files.
Language is set according to the user browser defaults.

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

Demo: https://stackblitz.com/edit/mil-i18-example?file=index.js

## Installation

```bash
npm i mil-i18 --save
```

## Usage

```html
<script type="module">
  import 'mil-i18/mil-i18.js';
  import { ifDefined } from 'lit-html/directives/if-defined';
</script>

<mil-i18 namespace="app" @translatedKeys="${(e)=>(this._i18=e.data}"></mil-i18>

<p>${ifDefined(this._i18.key1)}</p>
```

## File format

```bash
{
"key1":"translation1",
"key2":"translation2"
}
```

## Attributes

| Property           | Type   | Default               | Description                                                                                                                 |
| ------------------ | ------ | --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `allowedLanguages` | Array  | `['en', 'fr']`        | Languages for which there are translations files. Other languages will use the fallbackLanguage value                       |
| `fallbackLanguage` | String | `'en'`                | Fallback language in case the user default browser or the forcedLanguage values are not part of the allowedLanguages array. |
| `forcedLanguage`   | String | `''`                  | 'Forces language detection to a specific language'                                                                          |
| `namespace`        | String | `'namespaceValue'`    | 'Json language file name'                                                                                                   |
| `path`             | String | `'./assets/locales/'` | Path to the JSON language file.                                                                                             |
|                    |

## Events

@translatedKeys: fired when the language file is loaded. File content is exposed in e.detail.

## Linting with ESLint, Prettier, and Types

To scan the project for linting errors, run

```bash
npm run lint
```

You can lint with ESLint and Prettier individually as well

```bash
npm run lint:eslint
```

```bash
npm run lint:prettier
```

To automatically fix many linting errors, run

```bash
npm run format
```

You can format using ESLint and Prettier individually as well

```bash
npm run format:eslint
```

```bash
npm run format:prettier
```

## Local Demo with `es-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`

```bash
npm start:compatibility
```

To run a local development server in compatibility mode for older browsers that serves the basic demo located in `demo/index.html`
