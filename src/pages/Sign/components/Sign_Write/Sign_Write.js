import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import style from "./Sign_Write.module.css";
import { Link, useNavigate } from "react-router-dom";
import Org_Chart from '../../../Org_Chart/components/Org_Chart_Modal/Org_Chart';
import axios from 'axios';


const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }],
        ['bold', 'italic', 'underline'],
        ['link'],
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline',
    'link',
];

const Sign_Write = (props) => {

    // 모달을 키거나 끌때 필요한 놈
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };


    const navi = useNavigate();
    const [contents, setContents] = useState("에디터 내용");
    const [document_type, setDocument_type] = useState("품의서");
    const [title, setTitle] = useState("");
    const [recipient, setRecipient] = useState("결재자 이름");
    const [accept, setAccept] = useState(0);
    const [comment, setComment] = useState("");
    const [formdata, setFormData] = useState({
        files: []
    });

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, files: [...e.target.files] }))
    }
    // const handleQuillChange = (content, delta, source, editor) => {
    //     setQuillValue(editor.getContents());
    // };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = () => {
        const submitFormData = new FormData();

        // Append the additional data to the submitFormData object
        submitFormData.append("document_type", document_type);

        submitFormData.append("contents", contents);
        submitFormData.append("recipient", recipient);
        submitFormData.append("accept", accept);
        submitFormData.append("comment", comment);
        submitFormData.append("title", title);

        // Append files to the submitFormData
        formdata.files.forEach(e => {
            submitFormData.append("files", e);
        });

        // Send the data to the server
        axios.post('/api/signlist', submitFormData)
            .then(resp => {
                navi("/Groovy/signlist");
            })
            .catch(e => {
                console.error(e);
            });
    };



    return (
        <div>
            <div className={style.header}>
                새 결재 진행
                <hr />
            </div>
            <div className={style.documents1}>
                <div className={style.titleText}>기본설정</div>
                <div className={style.setting}>
                    <div className={style.label}>
                        문서종류
                    </div>
                    <div className={style.dropbox}>
                        <select name="doc">
                            <option value="품의서">품의서</option>
                            <option value="휴가신청서">휴가신청서</option>
                        </select>
                    </div>
                    <div className={style.rightContainer}>
                        <div className={style.writer}>
                            기안작성자
                        </div>
                        <div className={style.name}>
                            누군가의 이름
                        </div>
                    </div>
                </div>
                <div className={style.signline}>
                    <div className={style.titleText}>결제선 지정
                        <button onClick={toggleModal}>조직도 검색</button>
                        <Org_Chart isOpen={isModalOpen} close={toggleModal} />
                    </div>
                    <div className={style.table}>
                        <div className={style.tableBox}>
                            <div className={`${style.tableRow} ${style.tableHead}`}>
                                <div>구분</div>
                                <div>중간 결재자</div>
                                <div>최종 결재자</div>
                            </div>
                            <div className={style.tableRow}>
                                <div>이름</div>
                                <div>조직도 검색에서 선택한 멤버</div>
                                <div>조직도 검색에서 선택한 멤버</div>
                            </div>
                            <div className={style.tableRow}>
                                <div>부서</div>
                                <div>조직도 검색에서 선택한 부서</div>
                                <div>조직도 검색에서 선택한 부서</div>
                            </div>
                            <div className={style.tableRow}>
                                <div>직급</div>
                                <div>조직도 검색에서 선택한 직급</div>
                                <div>조직도 검색에서 선택한 직급</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.signwrite}>
                    <div className={style.title}>결제 작성</div>
                    <div className={style.tableBox}>
                        <div className={`${style.writeRow} ${style.writeHead}`}>
                            <div>기안부서</div>
                            <div>마케팅</div>
                            <div>기안일</div>
                            <div>2023-11-03</div>
                            <div>기안문서</div>
                            <div>자동설정</div>
                        </div>
                        <div className={style.titleRow}>
                            <div>제목</div>
                            <div>
                                <input
                                    type="text"
                                    style={{ width: '100%' }}
                                    placeholder="제목입력"
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="textEditor">
                        <ReactQuill
                            style={{ height: "200px", width: "1000px" }}
                            theme="snow"
                            modules={modules}
                            formats={formats}
                        // value={quillValue || ""}
                        // onChange={handleQuillChange}
                        />
                    </div>
                </div>
                <div className={style.fileRow}>
                    <div>파일첨부</div>
                    <div><input type="file" onChange={handleFileChange} multiple></input></div>
                </div>
                <div className={style.buttons}>
                    <button className={style.apply} onClick={handleSubmit}>신청</button>
                    <Link to="/Groovy/signlist"><button className={style.cancel}>취소</button></Link>
                </div>

            </div>
        </div>


    );
};
export default Sign_Write;