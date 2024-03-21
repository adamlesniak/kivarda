#!/usr/bin/env node
import {
  KivardaAnnotation,
  KivardaConfiguration,
  KivardaLabel,
  KivardaToken,
} from './interfaces';
import { readYaml } from './utils';

export class Kivarda {
  annotations: KivardaAnnotation[] = [];
  tokens: KivardaToken[] = [];
  tokensStemmed: string[] = [];

  /**
   * @returns instance of Kivarda
   *
   * @param text This is the text to be parsed and tokenized.
   *
   */
  async create(text: string, configPath: string): Promise<Kivarda> {
    // Read files and provide basic shape.
    const configuration = await readYaml<KivardaConfiguration>(configPath);

    this.tokens = this.parseTextToKivardaTokens(text);
    this.annotations = this.parseTextToKivardaAnnotations(
      configuration.Configuration.Categories,
      this.tokens,
    );

    return this;
  }

  /**
   * @returns formatted array of KivardaToken
   *
   * @param text This is the text input string.
   */
  private readonly parseTextToKivardaTokens = (
    text: string,
  ): KivardaToken[] => {
    let tokens: KivardaToken[] = [];
    const tokensText = text.split(' ');

    for (const token of tokensText) {
      tokens = [
        ...tokens,
        {
          text: token,
          start: text.indexOf(token),
          end: text.indexOf(token) + token.length,
        },
      ];
    }

    return tokens;
  };

  /**
   * @returns formatted array of KivardaAnnotation
   *
   * @param text This is the text input string.
   */
  private readonly parseTextToKivardaAnnotations = (
    labels: KivardaLabel[],
    tokens: KivardaToken[],
  ): KivardaAnnotation[] => {
    let annotations: KivardaAnnotation[] = [];

    for (const label of labels) {
      for (const token of tokens) {
        if (label.keywords.includes(token.text.toLowerCase())) {
          annotations = [
            ...annotations,
            {
              ...token,
              label: label.label,
            },
          ];
        }
      }
    }

    return annotations;
  };
}
