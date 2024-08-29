/** @format */
declare function languages(language: string): Promise<any>;

/** @format */
interface TranslateOptions {
    key?: string | null;
    target?: string;
    source?: string;
}
declare function translate(text: string, options?: TranslateOptions): Promise<{
    content: any;
    translated: boolean;
    time: {
        start: number;
        end: number;
        duration: number;
    };
    language: {
        source: any;
        target: any;
        certainty: any;
    };
    text: {
        input: string;
        output: any;
    };
    alternatives: any;
} | {
    error: string;
}>;
declare namespace translate {
    var key: null;
}

/** @format */
interface DetectOptions {
    key?: string | null;
}
declare function detect(text: string, options: DetectOptions): Promise<any>;
declare namespace detect {
    var key: null;
}

/** @format */

export { translate as default, detect, languages, translate };
