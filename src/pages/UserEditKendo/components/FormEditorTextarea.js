import React from 'react';
import { Editor, EditorTools, ProseMirror } from '@progress/kendo-react-editor';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label } from '@progress/kendo-react-labels';
import { loadMessages, IntlProvider, LocalizationProvider } from '@progress/kendo-react-intl';
import kendoMessages from 'kendoMessages.json';

loadMessages(kendoMessages, 'ru-RU');


const Placeholder = (emptyMessage) => {
    return new ProseMirror.Plugin({
        key: new ProseMirror.PluginKey('placeholder'),
        props: {
            decorations: (state) => {
                const { doc } = state;
                const empty = doc.textContent === '' && doc.childCount <= 1 && doc.content.size <= 2;

                if (!empty) {
                    return ProseMirror.DecorationSet.empty;
                }

                const decorations = [];
                const decAttrs = { class: 'placeholder', 'data-placeholder': emptyMessage };

                doc.descendants((node, pos) => {
                    decorations.push(ProseMirror.Decoration.node(pos, pos + node.nodeSize, decAttrs));
                });

                return ProseMirror.DecorationSet.create(doc, decorations);
            }
        }
    });
}

const PlaceholderStyles =
    `p.placeholder:first-child:before {
        content: attr(data-placeholder);
        float: left;
        color: rgb(0, 0, 0, 0.6);
        cursor: text;
        height: 0;
        font-size: 16px;
        line-height: 18px;
    }`;


const FormEditorTextarea = (fieldRenderProps) => {
    const { Bold, Italic, Underline } = EditorTools;

    const { validationMessage, touched, label, id, valid, disabled, type, optional, onChange, ...others } = fieldRenderProps;
    const editorTools = [[Bold, Italic, Underline]];

    const onMount = (event) => {
        const state = event.viewProps.state;
        const plugins = [
            ...state.plugins,
            Placeholder('Напишите что-нибудь ...')
        ];
        const documnt = event.dom.ownerDocument;
        documnt.querySelector('style').appendChild(documnt.createTextNode(PlaceholderStyles));

        return new ProseMirror.EditorView(
            { mount: event.dom }, {
            ...event.viewProps,
            state: ProseMirror.EditorState.create({ doc: state.doc, plugins })
        }
        );
    }

    const handleChange = (event) => {
        onChange({ value: event.html });
    }

    return <LocalizationProvider language="ru-RU">
        <IntlProvider locale={'ru'}>
            <FieldWrapper>
                <Label editorId={id} editorValid={valid} editorDisabled={disabled} optional={optional}>{label}</Label>
                <div className={'k-form-field-wrap'}>
                    <Editor
                        tools={editorTools}
                        contentStyle={{ height: 200 }}
                        className={"FormEditorTextarea"}
                        defaultEditMode="div"
                        onMount={onMount}
                        onChange={handleChange}
                        {...others}
                    />
                </div>
            </FieldWrapper>
        </IntlProvider>
    </LocalizationProvider>;
}

export default React.memo(FormEditorTextarea);