import React, { useState } from 'react'
import '../scss/PaymentDetail.scss'
import { Button, Form, InputGroup, Table } from 'react-bootstrap'
import LpData from '../data/Lp_data'
import { Link, useNavigate } from 'react-router-dom'
import PaymentForm from './PaymentForm'
import EstimateForm from './EstimateForm'

const PaymentDetail = () => {
    const [usageData, setUsageData] = useState(LpData);
    const navigate = useNavigate();

    const [paymentKey, setPaymentKey] = useState('payment');

    return (
        <div className='usageWrap'>
            <div className="usageTop"></div>
            <div className='minbanner'>
                <img src={process.env.PUBLIC_URL + "/img/minibanner.jpg"} alt="미니배너" />
            </div>

            <div className="usageContentWrap">
                <div className="usageSubMenu">
                    <div className="usageMenu1">
                        <h3>이용내역</h3>
                    </div>

                    <div className="usageMenu2" onClick={() => setPaymentKey('payment')}>
                        <Link to={Link} as={'/PaymentDetail'} style={{ textDecoration: 'none' }}>
                            <p>주차 요금 조회 / 정산</p>
                        </Link>
                    </div>

                    <div className="usageMenu3" onClick={() => setPaymentKey('estimate')}>
                        <Link to={Link} as={'/PaymentDetail'} style={{ textDecoration: 'none' }}>
                            <p>주차 예상 요금 조회</p>
                        </Link>
                    </div>

                    <div className="usageMenu4"></div>
                </div>

                <div className="contentBoxWrap">
                    <h2>주차 요금 조회</h2>

                    <InputGroup style={{marginBottom: '13px'}}> 
                        <Form.Control
                            placeholder="주차장 이름을 입력하세요."
                            aria-label="주차장 이름"
                        />

                        <Button id="usageButton">
                            <span className="material-symbols-outlined usageInputBtn">
                                search
                            </span>
                        </Button>
                    </InputGroup>

                    <div className="contentBox">
                        {paymentKey == "payment"?
                            <PaymentForm/>:null
                        }
                        {paymentKey == "estimate"?
                            <EstimateForm/>:null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentDetail