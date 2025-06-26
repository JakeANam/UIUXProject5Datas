import React from 'react'
import { useState } from 'react';
import { Button, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';

// 주차장 정보 가져오기
import LpData from '../data/Lp_data';
import parkingPaymentData from '../data/parkingPaymentData';

// 숫자 배열 만들기 (1, 2, 3, ...)
function makeNumArray(amount) {
  let numArray = new Array(amount);
  for (let i = 0; i < amount; i++) {
    numArray[i] = i;
  }
  return numArray;
}

// 날짜 출력 형식 (2025년 6월 1일 오전 11시 30분)
function setDateTimeForm(dateInput) {

    let year = dateInput.getFullYear() + '년 ';
    let month = (dateInput.getMonth() + 1) + '월 ';
    let date = dateInput.getDate() + '일 ';
    
    let hour;
    if (dateInput.getHours() >= 12) {
        hour = '오후 ' + dateInput.getHours() + '시 ';
    } else if (dateInput.getHours() == 0){
        hour = '오전 12시 ';
    } else {
        hour = '오전 ' + dateInput.getHours() + '시 ';
    }

    let minute = ' ';
    if (dateInput.getMinutes() > 0) {
        minute = dateInput.getMinutes() + '분 ';
    }

    let dateOutput = year + month + date + hour + minute;
    return dateOutput;
}

const Payment = () => {
    let [parkingLots, setParkingLots] = useState(LpData); // 주차장 목록
    let [disableParkinglot, setDisableParkinglot] = useState(true); // 주차장 선택 막기
    let [disableSelectTime, setDisableSelectTime] = useState(true); // 시간 선택 막기
    let [disableInput, setDisableInput] = useState(true); // 입력창(input:text) 막기
    const [key, setKey] = useState('payment');

    // 선택한 내용: 내용 전달, 초기화에 사용
    const [selectedArea, setSelectedArea] = useState(''); // 지역
    const [selectedParkinglot, setSelectedParkinglot] = useState(''); // 주차장
    const [selectedEnterTime, setSelectedEnterTime] = useState(''); // 입차일시
    const [selectedEnterHour, setSelectedEnterHour] = useState(''); // 입차 시간
    const [selectedEnterMinute, setSelectedEnterMinute] = useState(''); // 입차 분
    const [selectedExitTime, setSelectedExitTime] = useState(''); // 출차일시
    const [selectedExitHour, setSelectedExitHour] = useState(''); // 출차 시간
    const [selectedExitMinute, setSelectedExitMinute] = useState(''); // 출차 분
    const [writtenCarPlate, setWrittenCarPlate] = useState(''); // 차량번호

    // let locationOptions = new Array();
    // parkinglotData.forEach(oneData => {
    //     if(!locationOptions.includes(oneData.location)){
    //         locationOptions.push(oneData.location);
    //     }
    // });

    // 지역 선택 목록
    let locationOptions = ['경기도 수원시 장안구', '경기도 수원시 팔달구', '경기도 수원시 영통구', '경기도 수원시 권선구'];

    // 시간 목록
    const [hourList] = useState(makeNumArray(24));
    const [minuteList] = useState(makeNumArray(60));
    
    // 지역 선택하면 주차장선택 가능하게 하고 선택 목록 생성
    const bringParkinglotsOnThisArea = area => {
        setSelectedParkinglot('');
        setWrittenCarPlate('');
        setSelectedEnterTime('');
        setSelectedEnterHour('');
        setSelectedEnterMinute('');
        setSelectedExitTime('');
        setSelectedExitHour('');
        setSelectedExitMinute('');
        setSelectedArea(area);

        // 검색 내용이 비어었으면 검색 초기화하기
        setDisableInput(true);
        setDisableParkinglot(setDisableIfEmpty(area));
        setDisableSelectTime(true);

        if (area!="") {
            setParkingLots(
                LpData.filter(data => data.address.indexOf(area) >= 0)
            );
        }
    }

    // 선택한 값이 없으면 입력, 선택 비활성화 시키기
    const setDisableIfEmpty = input => {
        let toDisable =
            input == "" ?
            true : false;
        return toDisable;
    };

    // 차량번호 정규표현 (ex: 12가 3456 or 789힣 6543)
    const carNumRE = new RegExp("^\\d{2,3}[가-힣] \\d{4}$");

    // "조회하기" 버튼 누르면 조회 메세지 표시
    const checkPayment = () => {
        // 지역 선택이 안 되어있다면
        if (selectedArea == "") {
            alert("먼저 지역을 선택해주세요!");
        
            // 주차장 선택이 안 되어있다면
        } else if (selectedParkinglot=="") {
            alert("주차장을 선택해주세요!");
        
        // 차량 번호 입력이 안 되어있다면
        } else if (writtenCarPlate=="") {
            alert("차량 번호를 입력해주세요!");
            setSelectedEnterTime('');
            setSelectedExitTime('');

        // 차량 번호 입력을 잘못했다면
        } else if (!carNumRE.test(writtenCarPlate)) {
            alert(
                "차량 번호를 다시 입력해주세요!\n"
                + "차량 번호 입력 예: "
                + "'12가 3456' 혹은 '789힣 6543'"
            );
            setSelectedEnterTime('');
            setSelectedExitTime('');
        
        // 입력에 문제가 없다면 parkingPaymentData 와 비교
        } else {
            const oneCar = parkingPaymentData.filter(oneCar => oneCar.carPlate == writtenCarPlate);
            // 해당 차량의 입차 기록이 없다면 (parkingPaymentData에서 carPlate 없을 때)
            if (oneCar.length < 1 || selectedParkinglot != oneCar[0].parkinglotId) {
                alert("해당 차량, " + writtenCarPlate + " 은 입차하지 않았습니다.\n차량 번호를 다시 확인해주세요.")
                setSelectedEnterTime('');
                setSelectedExitTime('');
            } else {
                // 입차일시 입출력
                const enterTime = new Date(oneCar[0].enterTime);
                setSelectedEnterTime(setDateTimeForm(enterTime));

                // 출차일시 입출력
                const currentTime = new Date();
                setSelectedExitTime(setDateTimeForm(currentTime));

                // 
                // let timegap = currentTime - enterTime;
            }
        }
    }

    return (
        <Container id='payment'>
            <h2 className='subtitle'>주차 요금 조회</h2>
            <Tabs
            activeKey={key}
            onSelect={(k) => {
                setKey(k);
                setSelectedParkinglot('');
                setSelectedArea('');
                setWrittenCarPlate('');
                setDisableInput(true);
                setDisableParkinglot(true);
                setDisableSelectTime(true);
                setSelectedEnterTime('');
                setSelectedEnterHour('');
                setSelectedEnterMinute('');
                setSelectedExitTime('');
                setSelectedExitHour('');
                setSelectedExitMinute('');
            }}
            justify={true}
            className='paymentTabs'
            variant='pills'
            >
            {/* 주차 요금 조회 / 정산 */}
            <Tab  
                eventKey="payment"
                title="주차 요금 조회 / 정산"
                className='paymentTab'
            >
                <Row>
                <Col className='paymentForm'>
                    <Form>
                    <Form.Group className='selectLong'>
                        <Form.Label className='paymentLabel'>지역선택</Form.Label>
                        <Form.Select
                        onChange={
                            event => bringParkinglotsOnThisArea(event.target.value)
                        }
                        value={selectedArea}
                        >
                        <option value="">지역을 선택해주세요!</option>
                        {locationOptions.map((area, i) => 
                            <option value={area} key={i}>{area}</option>  
                        )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='selectLong'>
                        <Form.Label className='paymentLabel' defaultValue={""}>주차장선택</Form.Label>
                        <Form.Select
                            disabled={disableParkinglot}
                            value={selectedParkinglot}
                            onChange={(event) => {
                                setWrittenCarPlate('');
                                setSelectedParkinglot(event.target.value);
                                setDisableInput(setDisableIfEmpty(event.target.value));
                                setSelectedEnterTime('');
                                setSelectedExitTime('');
                            }}
                        >
                        <option value="" checked>주차장을 선택해주세요!</option>
                        {parkingLots.map((lot, i) => 
                            <option value={lot.id} key={i}>{lot.title}</option>
                        )}
                        
                        </Form.Select>
                    </Form.Group>
                        <Form.Group className='inputShortLeft'>
                        <Form.Label className='paymentLabel'>차량번호</Form.Label>
                        <Form.Control
                            type='text'
                            disabled={disableInput}
                            value={writtenCarPlate}
                            onChange={(event) => {
                                setWrittenCarPlate(event.target.value)
                            }}
                        />
                    </Form.Group>
                    
                    <Form.Group className='inputShortRight'>
                        <div className="checkboxInput">
                        <Form.Label className='checkboxLabel'>전기차 충전 여부</Form.Label>
                        <Form.Check type='checkbox' className='chargingCar'/><br/>
                        <Form.Label className='checkboxLabel'>충전하시는 분만 체크해주세요</Form.Label>
                        </div>
                    </Form.Group>

                    <Form.Group className='inputShortLeft'>
                        <Form.Label className='paymentLabel'>입차일시</Form.Label>
                        <Form.Control
                                type='text'
                                readOnly={true}
                                value={selectedEnterTime}
                        />
                    </Form.Group>

                    <Form.Group className='inputShortRight'>
                        <Form.Label className='paymentLabel'>출차일시</Form.Label>
                        <Form.Control
                                type='text'
                                readOnly={true}
                                value={selectedExitTime}
                        />
                    </Form.Group>

                    {
                        selectedEnterTime != '' && selectedExitTime != ''?
                        <div id="paymentResult">
                            <p>현재까지의 요금은<br/> <span>0</span>원 입니다.</p>
                        </div>:null
                    }
                    

                    <Button
                        className='checkPay'
                        onClick={() => checkPayment()}
                    >
                        조회하기
                    </Button>
                    <Button className='commitPay'>정산하기</Button>
                    </Form>
                </Col>

                <Col className='paymentBanner'>
                    <div className='bannerBox'>

                    </div>
                </Col>
                </Row>
                
            </Tab>

            {/* 주차 예상 요금 조회 */}
            <Tab
                eventKey="estimate"
                title="주차 예상 요금 조회"
                className='paymentTab'
            >
                <Row>
                <Col className='paymentForm'>
                    <Form>
                     <Form.Group className='selectLong'>
                        <Form.Label className='paymentLabel'>지역선택</Form.Label>
                        <Form.Select
                        onChange={(event) => bringParkinglotsOnThisArea(event.target.value)}
                        value={selectedArea}
                        >
                        <option value="">지역을 선택해주세요!</option>
                        {locationOptions.map((area, i) => 
                            <option value={area} key={i}>{area}</option>  
                        )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='selectLong'>
                        <Form.Label className='paymentLabel' defaultValue={""}>주차장선택</Form.Label>
                        <Form.Select
                            disabled={disableParkinglot}
                            value={selectedParkinglot}
                            onChange={(event) => {
                                setSelectedParkinglot(event.target.value);
                                setDisableSelectTime(setDisableIfEmpty(event.target.value));
                                setSelectedEnterHour('');
                                setSelectedEnterMinute('');
                                setSelectedExitHour('');
                                setSelectedExitMinute('');
                            }}
                        >
                        <option value="" checked>주차장을 선택해주세요!</option>
                        {parkingLots.map((lot, i) => 
                            <option value={lot.title} key={i}>{lot.title}</option>
                        )}
                        
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='inputShortLeft'>
                        <Form.Label className='paymentLabel'>입차일시</Form.Label>
                        <div className="timeForm">
                            <Form.Select
                                className='timeSelect'
                                value={selectedEnterHour}
                                disabled={disableSelectTime}
                                onChange={(event) => {
                                 setSelectedEnterHour(event.target.value);
                                 setDisableSelectTime(setDisableIfEmpty(event.target.value));
                                }}   
                            >
                                <option value="" >시간</option>
                                {hourList.map((hour, i) => 
                                    <option value={hour} key={i}>{hour}</option>
                                )}
                            </Form.Select>
                            시
                            <Form.Select
                                className='timeSelect'
                                value={selectedEnterMinute}
                                disabled={disableSelectTime}
                                onChange={(event) => {
                                    setSelectedEnterMinute(event.target.value);
                                    
                                }}
                            >
                                <option value="" >분</option>
                                {minuteList.map((minute, i) => 
                                    <option value={minute} key={i}>{minute}</option>
                                )}
                            </Form.Select>
                            분
                        </div>
                    </Form.Group>

                    <Form.Group className='inputShortRight'>
                        <Form.Label className='paymentLabel'>출차일시</Form.Label>
                        <div className="timeForm">
                            <Form.Select
                                className='timeSelect'
                                value={selectedExitHour}
                                disabled={disableSelectTime}
                                onChange={(event) => {
                                    setSelectedExitHour(event.target.value);
                                    setDisableSelectTime(setDisableIfEmpty(event.target.value));
                                }}
                            >
                                <option value="" >시간</option>
                                {hourList.map((hour, i) => 
                                    <option value={hour} key={i}>{hour}</option>
                                )}
                            </Form.Select>
                            시
                            <Form.Select
                                className='timeSelect'
                                value={selectedExitMinute}
                                disabled={disableSelectTime}
                                onChange={(event) => {
                                    setSelectedExitMinute(event.target.value);
                                    
                                }}
                            >
                                <option value="" >분</option>
                                {minuteList.map((minute, i) => 
                                    <option value={minute} key={i}>{minute}</option>
                                )}
                            </Form.Select>
                            분
                        </div>
                    </Form.Group>

                    <Form.Group className='inputShortLeft'>
                        <div className="checkboxInput">
                        <Form.Label className='checkboxLabel'>전기차 충전 여부</Form.Label>
                        <Form.Check type='checkbox' className='chargingCar'/><br/>
                        <Form.Label className='checkboxLabel'>충전하시는 분만 체크해주세요</Form.Label>
                        </div>
                    </Form.Group>

                    <Button
                        className='estimatePay'
                    >조회하기</Button>
                    </Form>
                </Col>

                <Col className='paymentBanner'>
                    <div className='bannerBox'>
                    
                    </div>
                </Col>
                </Row>
            </Tab>
            </Tabs>
        </Container>
    )
}

export default Payment