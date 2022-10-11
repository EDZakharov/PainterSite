import React, {useEffect, useRef, useState} from 'react';
import style from './Text-editor.module.scss'
import {setBiography} from "../../../../redux/toolkit";
import {usePatchBioMutation} from "../../../../redux/api";
import {useDispatch} from "react-redux";

const TextEditor = ({defValue, biography}) => {

    const rootDiv = useRef()
    const areaRef = useRef()
    const [value, setValue] = useState('')
    const [body] = usePatchBioMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        rootDiv.current.innerHTML = defValue.biography
    }, [])


    const onBtnClick = (e) => {
        e.preventDefault()
        body({description: value ? value : defValue.biography})
        dispatch(setBiography(value))
        console.log(defValue.biography)
    }

    const ViewText = () => {
        rootDiv.current.style.display = ""
        rootDiv.current.innerHTML = value
        let text = rootDiv.current.innerHTML
        text = text.replace(new RegExp("\n", "g"), "<BR>")
        rootDiv.current.innerHTML = text
    }

    const change_text = (tag1, tag2, tag1Style, tagType) => {
        if (tag1 == "" || tag2 == "") return
        let elemText = areaRef.current
        if (elemText == null) return
        let text = areaRef.current.value
        let posSelection1 = elemText.selectionStart
        let posSelection2 = elemText.selectionEnd
        let str1 = text.substr(0, posSelection1)
        let strMiddle = text.substr(posSelection1, posSelection2 - posSelection1)
        let str2 = text.substr(posSelection2)
        const styleStr = `style=\'color:${tag1.style}\'>`
        if (tagType === 'br') {
            const textsumm = str1 + tag1.tag + str2
            setValue(textsumm)
            elemText.selectionStart = str1.length + tag1.length
            elemText.selectionEnd = elemText.selectionStart + strMiddle.length
        } else {
            const textsumm = str1 + `${tag1.tag} ${tag1Style ? styleStr : '>'}` + strMiddle + tag2.tag + str2
            setValue(textsumm)
            elemText.selectionStart = str1.length + tag1.length
            elemText.selectionEnd = elemText.selectionStart + strMiddle.length
        }
    }

    if (value.length !== 0) {
        ViewText()
    }

    return (
        <div className={style.divViewer_wrapper}>
            <div className={style.divViewer}>
                <h1>Редактор биографии:</h1>
                <div className={style.divViewer_selectors}>
                    <button className={style.divViewer_bold_button} onClick={(e) => {
                        e.preventDefault()
                        change_text({tag: `<b`}, {tag: `</b>`});
                        ViewText();
                    }}>B
                    </button>
                    <button className={style.divViewer_BR_button} onClick={(e) => {
                        e.preventDefault()
                        change_text({tag: `<br>`, style: ''}, {tag: 'br'}, false, 'br')
                        ViewText();
                    }}>BR
                    </button>
                    <input type="color" className={style.divViewer_color_input}
                           onChange={(e) => {
                               change_text({tag: `<p`, style: e.target.value}, {tag: `</p>`}, true)
                               ViewText()
                           }}/>
                </div>
                <textarea id="editableTextarea"
                          className={style.textArea}
                          ref={areaRef}
                          value={value ? value : defValue.biography}
                          onChange={(e) => {
                              setValue(e.target.value)
                              ViewText()
                          }}/>
                <div className={style.biography_submit_button}>
                    <button type="submit" onClick={onBtnClick} className={style.biography_edit_button}>Отправить
                    </button>
                </div>
                <h4>Результат редактирования:</h4>
                <div className={style.biography_show}>
                    <div ref={rootDiv} className={style.root}/>
                </div>
            </div>
        </div>
    );
};

export default TextEditor;