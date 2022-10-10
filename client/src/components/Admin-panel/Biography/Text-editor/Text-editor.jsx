import React, {useRef, useState} from 'react';
import style from './Text-editor.module.scss'

const TextEditor = ({setValue, value, defValue, biography}) => {
    const rootDiv = useRef()
    const areaRef = useRef()

    function ViewText() {
        rootDiv.current.style.display = ""
        rootDiv.current.innerHTML = value
        let text = rootDiv.current.innerHTML
        text = text.replace(new RegExp("\n", "g"), "<BR>")
        rootDiv.current.innerHTML = text
    }

    function change_text(tag1, tag2, tag1Style) {
        if (tag1 == "" || tag2 == "") return
        let elemText = areaRef.current
        if (elemText == null) return
        let text = areaRef.current.value
        let posSelection1 = elemText.selectionStart
        let posSelection2 = elemText.selectionEnd
        let str1 = text.substr(0, posSelection1)
        let strMiddle = text.substr(posSelection1, posSelection2 - posSelection1)
        let str2 = text.substr(posSelection2)
        const styleStr = `style=\'color:${tag1.style}\'`
        const textsumm = str1 + `${tag1.tag} ${tag1Style ? styleStr: ''}>` + strMiddle + tag2.tag + str2
        setValue(textsumm)
        elemText.selectionStart = str1.length + tag1.length
        elemText.selectionEnd = elemText.selectionStart + strMiddle.length
        elemText.focus()
    }
    if (value.length !== 0) {ViewText()}

    return (
        <div className={style.divViewer}>
            <h1>Редактор текста:</h1>
            <div className={style.divViewer_btn}>
                <button onClick={(e) => {
                    e.preventDefault()
                    change_text({tag:`<b`}, {tag:`</b>`});
                    ViewText();
                }}><b>B</b></button>
                <input type="color" className={style.divViewer_color_input}
                       onChange={(e) =>{
                    change_text({tag:`<p`, style: e.target.value}, {tag:`</p>`}, true)
                    ViewText()}}/>
            </div>
            <textarea id="editableTextarea"
                      className={style.textArea}
                      value={value}
                      ref={areaRef}
                      defaultValue={biography ? biography: defValue.biography}
                      onChange={(e) => {
                          setValue(e.target.value)
                ViewText()
            }}>
            </textarea>
            <div>
                <h4>Текст для просмотра:</h4>
            </div>
            <div ref={rootDiv} className={style.root}/>
        </div>
    );
};

export default TextEditor;