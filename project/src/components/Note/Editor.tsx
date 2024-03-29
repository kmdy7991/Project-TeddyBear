import ReactQuill from "react-quill";
import "./Editor.css";
import { EditorProps } from "../../pages/Video/LectureNote";
export default function Editor({ value, onChange }: EditorProps) {
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "color",
    "code-block",
  ];
  return (
    <div>
      <ReactQuill
        style={{ border: "0" }}
        // ref={quillRef}
        // theme="snow"
        value={value}
        onChange={onChange} // 이제 onChange 이벤트가 발생할 때마다 onChange prop을 호출합니다.
        modules={modules}
        formats={formats}
        placeholder="내용을 입력하세요."
      />
    </div>
  );
}
