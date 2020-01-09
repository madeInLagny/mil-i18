import { html, LitElement } from 'lit-element';
import { debounce } from 'throttle-debounce';

export class MilI18 extends LitElement {
  static get properties() {
    return {
      language: { type: String },
      allowedLanguages: { type: Array },
      fallbackLanguage: { type: String },
      forcedLanguage: { type: String },
      namespace: { type: String },
      path: { type: String },
      fileData: { type: Object },
      _i18:{type: Object}
    };
  }

  constructor() {
    super();
    this.allowedLanguages = ['en', 'fr'];
    this.fallbackLanguage = 'en';
    this.forcedLanguage = '';
    this.namespace = 'namespaceValue';
    this.path = './assets/locales/';
    this._i18={}
  }

  render() {
    return html``;
  }

  firstUpdated() {
    this._setLanguage();
  }

  updated(changedProperties) {
    if (changedProperties.has('language')) {
      this._fetchFile();
      return;
    }
    if (
      changedProperties.has('namespace') ||
      changedProperties.has('forcedLanguage') ||
      changedProperties.has('path')
    ) {
      debounce(100, () => {
        this._fetchFile();
      });
    }
  }

  _fetchFile() {
    let lang;

    if (this.forcedLanguage) {
      lang = this.forcedLanguage;
    } else {
      lang = this.language;
    }

    const url = `${this.path}/${lang}/${this.namespace}.json`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        /* emit translated-keys-ready event */
        this.dispatchEvent(
          new CustomEvent('translatedKeys', {
            bubbles: true,
            composed: true,
            detail: data,
          }),
        );
      });
  }

  _setLanguage() {
    const language = navigator.language || navigator.userLanguage;
    const mainLanguage = language.substring(0, 2);
    if (this.allowedLanguages.indexOf(mainLanguage) !== -1) {
      this.language = mainLanguage;
    } else {
      this.language = this.fallbackLanguage;
    }
  }

  /* Todo: provide connection to firebase Store */
}
