import React from 'react';
import { Nav, Image, Tab, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

const MemberCampingOrder = props => (
    <main className="col-md-10 col-sm-12 my-2">
        <h5 className="text-center rwd_title">營地訂單</h5>
        <Tab.Container defaultActiveKey="coming" className="">
            <Nav variant="tabs" defaultActiveKey="coming">
                <Nav.Item>
                    <Nav.Link eventKey="coming" href="#">即將到來</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="finished">已完成</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="cancelled">已取消</Nav.Link>
                </Nav.Item>
            </Nav>
            <Tab.Content>
                <Tab.Pane eventKey="coming">
                    <div className="row border p-sm-3 mt-3">
                        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12 rwd_orderavatar">
                            <figure className="order_avatar m-0">
                                <Image src="../../images/toothless.jpg" />
                            </figure>
                            <div className="d-flex flex-column justify-content-center align-items-start m-2 rwd_details_top">
                                <div className="text-right">
                                    <Button className="btn btn-grass" href="#">查看細節</Button>
                                </div>
                                <span className="text-right fs-18 fw-light">總金額 NT$1,200</span>
                            </div>
                        </div>
                        <div className="col-sm-12 seperate_line m-2 mb-0"></div>
                        <div className="col-xl-8 col-lg-7 col-md-8 col-sm-12 d-flex rwd_ordercontent">
                            <div className="d-flex flex-column justify-cont ent-center">
                                <span className="fw-light mb-sm-1">營地名稱：石梯坪露營區</span>
                                <span className="fw-light mb-sm-1">營區名稱：有頂營位</span>
                                <span className="fw-light mb-sm-1">入住期間：2019/06/28 ~ 2019/06/30</span>
                                <span className="fw-light mb-sm-1">
                                    付款方式：虛擬帳號ATM轉帳<small className="watermelon">(尚未付款)</small>
                                </span>
                                <span className="fw-light">訂單編號：2268749581</span>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 p-0 d-flex justify-content-end align-content-between flex-wrap rwd_details_bottom">
                            <div className="text-right">
                                <NavLink className="btn btn-grass details" to="#">查看細節</NavLink>
                            </div>
                            <span className="text-right fs-18 fw-light">總金額 NT$1,200</span>
                        </div>
                    </div>
                    {/* <div>
                        <p className="text-center my-3 p-3 fs-20 fw-light border">尚無訂單</p>
                    </div> */}
                </Tab.Pane>
                <Tab.Pane eventKey="finished">
                    {/* <div className="d-flex row border p-sm-3 mt-3">
                        <div className="col-sm-2 d-flex align-items-center p-sm-0">
                            <figure className="order_avatar m-0">
                                <Image src="../../images/toothless.jpg" />
                            </figure>
                        </div>
                        <div className="col-sm-10 d-flex justify-content-between">
                            <div className="d-flex flex-column justify-content-center">
                                <span className="fw-light mb-sm-1">營地名稱：磯崎海水浴場露營區</span>
                                <span className="fw-light mb-sm-1">營區名稱：木造露營區-哈比屋營位</span>
                                <span className="fw-light mb-sm-1">入住期間：2019/05/20 ~ 2019/05/21</span>
                                <span className="fw-light mb-sm-1">
                                    付款方式：信用卡<small className="grass">(已付款)</small>
                                </span>
                                <span className="fw-light">訂單編號：1834214785</span>
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                                <div className="text-right">
                                    <Button className="btn btn-grass" href="#">查看細節</Button>
                                </div>
                                <span className="text-right fs-18 fw-light">總金額 NT$1,000</span>
                            </div>
                        </div>
                    </div> */}
                    <div>
                        <p className="text-center my-3 p-3 fs-20 fw-light border">尚無訂單</p>
                    </div>
                </Tab.Pane>
                <Tab.Pane eventKey="cancelled">
                    <div>
                        <p className="text-center my-3 p-3 fs-20 fw-light border">尚無訂單</p>
                    </div>
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>

    </main>
)

export default MemberCampingOrder