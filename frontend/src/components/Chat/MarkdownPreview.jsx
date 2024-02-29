import { useCallback, useMemo, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-markdown";
import { Text, createEditor, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

import { useModal } from "@stores/ModalStore";
import { blooks } from "@stores/BlookStore";

import { AreYouSureLinkModal } from "@components/Modals/Chat";

import styles from "@styles";

Prism.languages.blacketMarkdown = {
    colorBoldItalic: { pattern: /\{#([0-9a-fA-F]{6})\}\*\*\*([^\*]+)\*\*\*\{#([0-9a-fA-F]{6})\}/g },
    colorBold: { pattern: /\{#([0-9a-fA-F]{6})\}\*\*([^\*]+)\*\*\{#([0-9a-fA-F]{6})\}/g },
    colorItalic: { pattern: /\{#([0-9a-fA-F]{6})\}\*([^\*]+)\*\{#([0-9a-fA-F]{6})\}/g },
    colorStrikethrough: { pattern: /\{#([0-9a-fA-F]{6})\}\~\~([^\~]+)\~\~\{#([0-9a-fA-F]{6})\}/g },
    colorUnderlined: { pattern: /\{#([0-9a-fA-F]{6})\}\_\_([^\_]+)\_\_\{#([0-9a-fA-F]{6})\}/g },
    color: { pattern: /\{#([0-9a-fA-F]{6})\}([^\{]+)\{#([0-9a-fA-F]{6})\}/g },
    boldItalic: { pattern: /\*\*\*([^\*]+)\*\*\*/g, },
    bold: { pattern: /\*\*([^\*]+)\*\*/g },
    italic: { pattern: /\*([^\*]+)\*/g },
    strikethrough: { pattern: /\~\~([^\~]+)\~\~/g },
    underlined: { pattern: /\_\_([^\_]+)\_\_/g },
    code: { pattern: /\`([^\`]+)\`/g },
    // mention: { pattern: /\@([^\s]+)/g },
    link: { pattern: /https?:\/\/([^\s]+)/g },
    // emoji: { pattern: /:([^\s]+):/g }
}

export default function MarkdownPreview({ content, color, onLeafChange, readOnly, ...props }) {
    if (!onLeafChange) onLeafChange = () => { };

    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    editor.clearContent = () => {
        editor.children.map(() => Transforms.delete(editor, { at: [0] }));

        editor.children = [{ type: "paragraph", children: [{ text: "" }] }];

        Transforms.select(editor, { offset: 0, path: [0, 0] });
    }

    const { createModal } = useModal();

    const Leaf = ({ attributes, children, leaf }) => {
        // console.log(leaf)

        useEffect(() => {
            onLeafChange(editor);
        }, [leaf]);


        switch (true) {
            case leaf.code:
                return <span {...attributes} className={readOnly ? styles.textFormatting.codeDark : styles.textFormatting.code}>{readOnly ? leaf.content : children}</span>;
            case leaf.mention:
                return <span {...attributes} className={styles.textFormatting.mention}>{readOnly ? leaf.content : children}</span>;
            case leaf.link:
                return <a {...attributes} className={styles.all.link} href={leaf.content} onClick={e => {
                    e.preventDefault();

                    createModal(<AreYouSureLinkModal link={leaf.content} />);
                }}>{readOnly ? leaf.content : children}</a>;
            case leaf.emoji:
                const blook = blooks.find(blook => blook.name.toLowerCase() === leaf.content.toLowerCase());

                if (blook) return (
                    <span {...attributes}>
                        <span style={{ display: "none" }}>{children}</span>
                        <img src={blook.image} alt={blook.name} className={styles.chat.emoji} />
                    </span>
                )

            case leaf.color:
                return <span {...attributes} className={`
                    ${(leaf.colorBold || leaf.colorBoldItalic) ? styles.textFormatting.bold : ""}
                    ${(leaf.colorItalic || leaf.colorBoldItalic) ? styles.textFormatting.italic : ""}
                    ${leaf.colorStrikethrough ? styles.textFormatting.strikethrough : ""}
                    ${leaf.colorUnderlined ? styles.textFormatting.underline : ""}
                `} style={{ color: leaf.hexcode }}>{readOnly ? leaf.content : children}</span>;

            default:
                return <span {...attributes} className={`
                    ${(leaf.bold || leaf.boldItalic) ? styles.textFormatting.bold : ""}
                    ${(leaf.italic || leaf.boldItalic) ? styles.textFormatting.italic : ""}
                    ${leaf.strikethrough ? styles.textFormatting.strikethrough : ""}
                    ${leaf.underlined ? styles.textFormatting.underline : ""}
                `}>{readOnly ? leaf.content ? leaf.content : children : children}</span>;
        }
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
                switch (token.type) {
                    case "boldItalic":
                    case "bold":
                    case "italic":
                    case "strikethrough":
                    case "underlined":
                        ranges.push({
                            [token.type]: true,
                            content: node.text.slice(start, end).replace(token.type === "boldItalic" ? /\*\*\*|\*\*\*/g : token.type === "bold" ? /\*\*|\*\*/g : token.type === "italic" ? /\*|\*/g : token.type === "strikethrough" ? /\~\~|\~\~/g : /\_\_|\_\_/g, ""),
                            anchor: { path, offset: start },
                            focus: { path, offset: end }
                        });

                        break;
                    case "code":
                        ranges.push({
                            code: true,
                            content: node.text.slice(start, end).replace(/\`|\`/g, ""),
                            anchor: { path, offset: start },
                            focus: { path, offset: end }
                        });

                        break;
                    case "mention":
                        ranges.push({
                            mention: true,
                            content: node.text.slice(start, end).replace(/\@/g, ""),
                            anchor: { path, offset: start },
                            focus: { path, offset: end }
                        });

                        break;
                    case "link":
                        ranges.push({
                            link: true,
                            content: node.text.slice(start, end),
                            anchor: { path, offset: start },
                            focus: { path, offset: end }
                        });

                        break;
                    case "emoji":
                        ranges.push({
                            emoji: true,
                            content: node.text.slice(start, end).replace(/:([^:]+):/g, "$1"),
                            anchor: { path, offset: start },
                            focus: { path, offset: end }
                        });
                        break;

                    case "colorBoldItalic":
                        ranges.push({
                            color: true,
                            colorBoldItalic: true,
                            hexcode: token.content[1] + token.content[2] + token.content[3] + token.content[4] + token.content[5] + token.content[6] + token.content[7],
                            content: node.text.slice(start, end).replace(/\{#([0-9a-fA-F]{6})\}\*\*\*|\*\*\*\{#([0-9a-fA-F]{6})\}/g, ""),
                            anchor: { path, offset: start },
                            focus: { path, offset: end }
                        });
                        break;

                    case "colorBold":
                        ranges.push({
                            color: true,
                            colorBold: true,
                            hexcode: token.content[1] + token.content[2] + token.content[3] + token.content[4] + token.content[5] + token.content[6] + token.content[7],
                            content: node.text.slice(start, end).replace(/\{#([0-9a-fA-F]{6})\}\*\*|\*\*\{#([0-9a-fA-F]{6})\}/g, ""),
                            anchor: { path, offset: start },
                            focus: { path, offset: end }
                        });
                        break;

                    case "colorItalic":
                        ranges.push({
                            color: true,
                            colorItalic: true,
                            hexcode: token.content[1] + token.content[2] + token.content[3] + token.content[4] + token.content[5] + token.content[6] + token.content[7],
                            content: node.text.slice(start, end).replace(/\{#([0-9a-fA-F]{6})\}\*|\*\{#([0-9a-fA-F]{6})\}/g, ""),
                            anchor: { path, offset: start },
                            focus: { path, offset: end }
                        });
                        break;

                    case "colorStrikethrough":
                        ranges.push({
                            color: true,
                            colorStrikethrough: true,
                            hexcode: token.content[1] + token.content[2] + token.content[3] + token.content[4] + token.content[5] + token.content[6] + token.content[7],
                            content: node.text.slice(start, end).replace(/\{#([0-9a-fA-F]{6})\}\~\~|\~\~\{#([0-9a-fA-F]{6})\}/g, ""),
                            anchor: { path, offset: start },
                            focus: { path, offset: end }
                        });
                        break;

                    case "colorUnderlined":
                        ranges.push({
                            color: true,
                            colorUnderlined: true,
                            hexcode: token.content[1] + token.content[2] + token.content[3] + token.content[4] + token.content[5] + token.content[6] + token.content[7],
                            content: node.text.slice(start, end).replace(/\{#([0-9a-fA-F]{6})\}\_\_|\_\_\{#([0-9a-fA-F]{6})\}/g, ""),
                            anchor: { path, offset: start },
                            focus: { path, offset: end }
                        });
                        break;

                    case "color":
                        ranges.push({
                            color: true,
                            hexcode: token.content[1] + token.content[2] + token.content[3] + token.content[4] + token.content[5] + token.content[6] + token.content[7],
                            content: node.text.slice(start, end).replace(/\{#([0-9a-fA-F]{6})\}|\{#([0-9a-fA-F]{6})\}/g, ""),
                            anchor: { path, offset: start },
                            focus: { path, offset: end }
                        });
                        break;
                }
            }

            start = end;
        }

        return ranges;
    }, []);

    const initialValue = content ? content.split("\n").map(text => ({ type: "paragraph", children: [{ text }] })) : [{ type: "paragraph", children: [{ text: "" }] }];

    return (
        <Slate editor={editor} initialValue={initialValue}>
            <Editable renderLeaf={renderLeaf} decorate={decorate} readOnly={readOnly} contentEditable={readOnly ? undefined : true} style={{ color: color && color }} {...props} />
        </Slate>
    )
}