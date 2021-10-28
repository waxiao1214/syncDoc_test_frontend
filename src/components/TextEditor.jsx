import React, { useCallback, useEffect, useState } from 'react'
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered"}, {oist: "bullet"}],
  ['bold', 'italic', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub'}, { script: 'super' }],
  [{ align: [] }],
  ['image', 'blockquote', 'code-block'],
  ['clean']
]

export default function TextEditor({ socket }) {;
  const [quill, setQuill] = useState(null);

  useEffect(() => {
    if(socket === null || quill === null) return
    const handler = (delta, oldDelta, source) => {
      if(source !== "user") return
      socket.emit('send-changes', delta)
    }

    quill.on('text-change', handler)

    return () => {
      quill.off('text-change', handler)
    }
  }, [socket, quill])

  useEffect(() => {
    if(socket === null || quill === null) return
    const handler = (delta) => {
      quill.updateContents(delta)
    }
    socket.on('receive-changes', handler)
    return () => socket.off('receive-changes', handler)
  }, [socket, quill])

  useEffect(() => {
    if(socket === null || quill === null) return
    socket.once("load-document", document => {
      quill.setContents(document)
      quill.enable()
    })
  }, [socket, quill])

  useEffect(() => {
    if(socket === null || quill === null) return
    setInterval(() => {
      socket.emit('save-document', quill.getContents())
    }, 2000)
  }, [socket, quill])

  const wrapperRef = useCallback((wrapper) => {    
    if(wrapper === null) return
    const editor = document.createElement('div');
    wrapper.append(editor);

    const q = new Quill('#container', { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS} })
    setQuill(q)
    return () => {
      wrapper.innerHtml = ""
    }
  }, [])

  return (
    <div id="container" ref={wrapperRef}>
    </div>
  )
}
