export interface KivardaConfiguration {
  Configuration: {
    Categories: {
      label: string;
      keywords: string[];
    }[];
  };
}

export interface KivardaToken {
  end: number;
  start: number;
  text: string;
}

export interface KivardaAnnotation extends KivardaToken {
  label: string;
}

export interface KivardaLabel {
  label: string;
  keywords: string[];
}
