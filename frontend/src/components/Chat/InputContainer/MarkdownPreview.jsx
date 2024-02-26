import { useCallback, useMemo, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-markdown";
import { Text, createEditor, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { css } from "@emotion/css";

Prism.languages.blacketMarkdown = {
    // bold-italic is ***bold-italic***
    "bold-italic": {
        pattern: /(^|[^\\])((\*\*\*)([\s\S]*?)(\*\*\*))(?!\2)/,
        lookbehind: true,
        inside: {
            punctuation: /^\*\*\*/,
            content: /[\s\S]*?/,
            punctuation2: /\*\*\*/
        }
    },
    // bold is **bold**
    bold: {
        pattern: /(^|[^\\])((\*\*)([\s\S]*?)(\*\*))(?!\2)/,
        lookbehind: true,
        inside: {
            punctuation: /^\*\*/,
            content: /[\s\S]*?/,
            punctuation2: /\*\*/
        }
    },
    // italic is *italic* or _italic_ but not __italic__
    italic: {
        pattern: /(^|[^\\])((\*|(?<!_)_(?!_))([\s\S]*?)(\*|(?<!_)_(?!_)))(?!\2)/,
        lookbehind: true,
        inside: {
            punctuation: /^(\*|_)/,
            content: /[\s\S]*?/,
            punctuation2: /(\*|_)/
        }
    },
    // strikethrough is ~~strikethrough~~
    strikethrough: {
        pattern: /(^|[^\\])((~~)([\s\S]*?)(~~))(?!\2)/,
        lookbehind: true,
        inside: {
            punctuation: /^~~/,
            content: /[\s\S]*?/,
            punctuation2: /~~/
        }
    },
    // underlined is __underlined__
    underlined: {
        pattern: /(^|[^\\])((__)([\s\S]*?)(__))(?!\2)/,
        lookbehind: true,
        inside: {
            punctuation: /^__/,
            content: /[\s\S]*?/,
            punctuation2: /__/
        }
    },
    // code is `code`
    code: {
        pattern: /(^|[^\\])((`)([\s\S]*?)(`))(?!\2)/,
        lookbehind: true,
        inside: {
            punctuation: /^`/,
            content: /[\s\S]*?/,
            punctuation2: /`/
        }
    },
    // mention is <@userid>
    mention: {
        pattern: /(^|[^\\])((<@)([\s\S]*?)(>))(?!\2)/,
        lookbehind: true,
        inside: {
            punctuation: /^<@/,
            content: /[\s\S]*?/,
            punctuation2: />/
        }
    },
    // link is https://example.com or [link](https://example.com)
    link: {
        pattern: /(^|[^\\])((\[(.*?)\]\((.*?)\))|((https?:\/\/)?[\w-%]+(\.[\w-%]+)+\.?(:\d+)?(\/\S*)?))/,
        lookbehind: true,
        inside: {
            punctuation: /^\[|\]/,
            content: /[\s\S]*?/,
            punctuation2: /^\(|\)/
        }
    }
}

export default function MarkdownPreview({ content, onLeafChange, ...props }) {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    editor.clearContent = () => {
        editor.children.map(() => Transforms.delete(editor, { at: [0] }));

        editor.children = [{ type: "paragraph", children: [{ text: "" }] }];

        Transforms.select(editor, { offset: 0, path: [0, 0] });
    }

    const Leaf = ({ attributes, children, leaf }) => {
        useEffect(() => {
            onLeafChange(editor);
        }, [leaf]);

        return (<span
            className={css`
                    font-weight: ${(leaf.bold || leaf["bold-italic"]) && "bold"};
                    font-style: ${(leaf.italic || leaf["bold-italic"]) && "italic"};
                    text-decoration: ${leaf.strikethrough ? "line-through" : (leaf.underlined ? "underline" : "none")};

                    ${leaf.code && css`
                        font-family: monospace;
                        background-color: var(--secondary-color);
                        border-radius: 3px;
                        padding: 3px;
                    `}

                    ${leaf.mention && css`
                        color: hsl(235 calc( 1 * 86.2%) 88.6% / 1);
                        font-weight: bold;
                        padding: 1px;
                        border-radius: 3px;
                        background: hsl(235 calc( 1 * 85.6%) 64.7% / 0.3);
                    `}

                    ${leaf.link && css`
                        color: lightblue;
                        text-decoration: underline;
                    `}
                `}
            {...attributes}
        >
            {children}
        </span>)
    }

    const renderLeaf = useCallback(props => <Leaf {...props} />, []);

    const decorate = useCallback(([node, path]) => {
        const ranges = [];

        if (!Text.isText(node)) return ranges;

        const getLength = (token) => {
            if (typeof token === "string") return token.length;
            else if (typeof token.content === "string") return token.content.length;
            else return token.content.reduce((l, t) => l + getLength(t), 0);
        }

        const tokens = Prism.tokenize(node.text, Prism.languages.blacketMarkdown);

        let start = 0;

        for (const token of tokens) {
            const length = getLength(token);
            const end = start + length;

            if (typeof token !== "string") {
                ranges.push({
                    [token.type]: true,
                    anchor: { path, offset: start },
                    focus: { path, offset: end },
                });
            }

            start = end;
        }

        return ranges;
    }, []);

    return (
        <Slate editor={editor} initialValue={[{ type: "paragraph", children: [{ text: "" }] }]}>
            <Editable renderLeaf={renderLeaf} decorate={decorate} {...props} />
        </Slate>
    )
}