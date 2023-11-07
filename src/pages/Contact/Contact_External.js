import { useEffect, useState } from "react";
import { Col, Container, Input, Row } from "reactstrap";
import style from "./Contact.module.css";
import axios from "axios";

const Contact_External = () => {
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        axios.get("/api/contact/selectExternal").then((resp) => {
            setContacts(resp.data);
        }).catch(err => {
            console.log(err);
        })

    }, [])


    return (
        <Container>
            <Row className={style.search_row}>
                <Col xs={10}></Col>
                <Col xs={2} className={style.search_container}>
                    <Input placeholder="검색" className={style.input_search}></Input>
                </Col>
            </Row>

            <Row className={style.contacts_row}>
                <Col xs={12} className={style.contacts_list_container}>
                    <Row className={style.contacts_list}>
                        <Row className={style.contacts_list_header}>
                            <Col xs={1} className={style.header_company}>회사</Col>
                            <Col xs={2} className={style.header_group}>부서</Col>
                            <Col xs={2} className={style.header_name}>이름</Col>
                            <Col xs={1} className={style.header_position}>직책</Col>
                            <Col xs={3} className={style.header_contact}>연락처</Col>
                            <Col xs={3} className={style.header_email}>이메일</Col>
                        </Row>

                        {
                            contacts.map((member) => {
                                return (
                                    <Row className={style.contact_object} key={member.id}>
                                        <Col xs={1} className={style.company_container}>
                                            {member.company}
                                        </Col>
                                        <Col xs={2} className={style.group_container}>
                                            {member.group_name}
                                        </Col>
                                        <Col xs={2} className={style.name_container}>
                                            {member.name}
                                        </Col>
                                        <Col xs={1} className={style.position_container}>
                                            {member.position}
                                        </Col>
                                        <Col xs={3} className={style.contact_container}>
                                            {member.contact}
                                        </Col>
                                        <Col xs={3} className={style.email_container}>
                                            {member.email}
                                        </Col>
                                    </Row>

                                )
                            })
                        }

                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Contact_External;