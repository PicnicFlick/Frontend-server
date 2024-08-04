import styled from 'styled-components';
import { WrapperAuth } from './AuthLogin';
import AuthHeader from 'components/AuthHeader';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PLACESINFO } from 'consts/places';
import { useNavigate } from 'react-router-dom';

function AuthItem() {
    const navigate = useNavigate();

    const text = '대여품 수량관리';
    const placeIdList = [1, 2, 3];
    const [resultList, setResultList] = useState([]);
    const [totalCnt, setTotalCnt] = useState(0);
    const [availableTotalCnt, setAvailableTotalCnt] = useState(0);

    const fetchItem = async () => {
        let tmp = [];
        const token = sessionStorage.getItem('token');

        for (let i = 0; i < placeIdList.length; i++) {
            console.log(token);
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACK_API}/api/v1/mat`,
                    {
                        headers: {
                            Authorization: token,
                        },
                        params: {
                            placeId: placeIdList[i],
                        },
                    },
                );
                tmp.push(response.data.result);
                console.log(response.data);
            } catch (error) {
                // alert(error);
            }
        }
        setResultList(tmp);
        let tmp_totalCnt = 0;
        let tmp_availableTotalCnt = 0;
        tmp.forEach(item => {
            tmp_totalCnt += item.matIdList.length;
            tmp_availableTotalCnt += item.availableCount;
        });

        setTotalCnt(tmp_totalCnt);
        setAvailableTotalCnt(tmp_availableTotalCnt);
    };
    //resultList에 각 대여장소별 response.data.result를 모아둠

    const onClickAdd = async event => {
        const placeId = Number(event.currentTarget.id);
        const token = sessionStorage.getItem('token');

        let tmp = window.confirm(
            `해당 ${placeId}번 위치에 돗자리를 추가하시겠습니까?`,
        );

        if (tmp)
            try {
                //[관리자 페이지]돗자리 추가 API
                const response = await axios.post(
                    `${process.env.REACT_APP_BACK_API}/api/v1/mat/admin`,
                    {
                        placeId: placeId,
                        price: 3000,
                    },
                    {
                        headers: {
                            Authorization: token,
                        },
                    },
                );
                console.log(response.data);
                alert('성공적으로 추가되었습니다');
                fetchItem();
            } catch (error) {
                alert(error);
            }
    };

    const onClickDelete = async event => {
        const placeId = Number(event.currentTarget.dataset.placeid);
        //dataset의 속성이름에 대문자 들어가면 안됨

        const id = Number(event.currentTarget.id);
        const token = sessionStorage.getItem('token');

        let tmp = window.confirm(
            `해당 ${placeId}번 위치의 ${id}번 돗자리를 삭제하시겠습니까?`,
        );

        if (tmp)
            try {
                const response = await axios.delete(
                    `${process.env.REACT_APP_BACK_API}/api/v1/mat/${id}/admin`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    },
                );
                console.log(response.data);
                alert('성공적으로 삭제되었습니다');
                fetchItem();
            } catch (error) {
                alert(error);
            }
    };

    useEffect(() => {
        fetchItem();
    }, []);

    //관리자 로그인 여부//
    useEffect(() => {
        const parsed = JSON.parse(process.env.REACT_APP_AUTH_ACCOUNT);
        const sessionItem = JSON.parse(sessionStorage.getItem('authKey'));

        if (
            !sessionItem ||
            sessionItem.id !== parsed.id ||
            sessionItem.password !== parsed.password
        ) {
            alert('관리자 로그인이 필요한 서비스입니다');
            navigate('/auth/login');
        }
    }, []);

    return (
        <WrapperAuth>
            <AuthHeader text={text} />
            <TopText>
                총 수량 : <span>{totalCnt}개</span>
                <Spacer />
                대여 중인 총 수량 : <span>{availableTotalCnt}개 </span>
            </TopText>
            <FullBox>
                <RentalShopContainer>
                    {resultList?.map((item, index) => {
                        return (
                            <div key={index}>
                                <RentalShopName>
                                    <RentalShopNameText>
                                        {index + 1}. {PLACESINFO[index].name}
                                    </RentalShopNameText>
                                </RentalShopName>
                                <RentalShopBox>
                                    <IndexBox>
                                        <IndexTopic>사물함번호</IndexTopic>
                                        <IndexTopic>돗자리 ID</IndexTopic>
                                        <IndexTopic>비고</IndexTopic>
                                    </IndexBox>
                                    <AllLocker>
                                        {item.matIdList.map((item2, index2) => (
                                            <OneLocker key={index2}>
                                                <IndexNumber>
                                                    {index2 + 1}
                                                </IndexNumber>
                                                <ItemNumber>{item2}</ItemNumber>
                                                {/* PLACESINFO는 상수(프론트에서 관리하는 대여장소들 정보) */}
                                                <Delete>
                                                    <DeleteButton
                                                        id={item2}
                                                        data-placeid={index + 1}
                                                        onClick={onClickDelete}
                                                    >
                                                        돗자리 삭제
                                                    </DeleteButton>
                                                </Delete>
                                            </OneLocker>
                                        ))}
                                    </AllLocker>
                                    <AddButton
                                        id={index + 1}
                                        onClick={onClickAdd}
                                    >
                                        + 돗자리 추가
                                    </AddButton>
                                    <Quantity>
                                        <QuantityTest>
                                            총 수량 : {item.matIdList?.length}{' '}
                                            <Spacer2 /> 대여 중인 수량 :{' '}
                                            {item.availableCount}
                                        </QuantityTest>
                                    </Quantity>
                                </RentalShopBox>

                                <br />
                            </div>
                        );
                    })}
                </RentalShopContainer>
            </FullBox>
        </WrapperAuth>
    );
}
export default AuthItem;

const TopText = styled.h1`
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.333px;
    margin-top: 30px;
    span {
        color: #00d09e;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: -0.333px;
    }
`;
//span요소를 사용해서 tap한 것 처럼
const Spacer = styled.span`
    display: inline-block;
    width: 80px;
`;
const FullBox = styled.div`
    margin-top: 30px;
`;
const RentalShopName = styled.div`
    padding-left: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
`;
const RentalShopNameText = styled.h1`
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.333px;
    margin-top: 0 29px;
    flex: 1;
`;
//각 대여소 Box를 가로로 나열하기 위해 Container 컴포넌트를 따로 만들어줬다.
const RentalShopContainer = styled.div`
    /*row 배치*/
    display: flex; /*부모 컨테이너와 자식 요소들(여기선 RentalShopBox)의 배치를 쉽게 제어할 수 있게 해줌!*/
    flex-direction: row; /*컨테이너 내의 아이템들이 가로(row)방향으로 배치되도록 함*/
    align-items: flex-start; /*Flexbox컨테이너 내의 아이템들을 세로로 어떻게 정렬할지 결정 잠 flex-start -> 아이템들을 컨테이너 시작점(위쪽)에 맞추어 정렬한다.*/
    justify-content: space-around; /*Flexbox 컨테이너 내의 아이템들을 가로 방량으로 어떻게 정렬할것인지 결정 -> 첫번째와 마지막 아이템 사이에 동일한 간격을 둔다.*/
    flex-wrap: wrap; /*컨테이너 내 item들이 크기 초과할 때 어떻게 동작하는지 결정. wawrp => 아이템들이 컨테이너 너비 초과하면 다음 줄로 이동하여 베차 -> 반응형 레이아웃*/
    width: 100%;
`;
const AllLocker = styled.div`
    width: 100%;
    height: 240px;

    border-bottom: 1.5px solid #000;
    padding: 10px 0;
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
`;

const RentalShopBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 300px;
    margin: 10px;
    padding: 20px;
    flex-shrink: 0;
    border-radius: 12px;
    background: #d9d9d9;
`;
const IndexBox = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1.5px solid #000; /* 줄 */
`;
const IndexTopic = styled.h1`
    width: 86px;
    height: 33px;
    flex-shrink: 0;
    color: var(--kakao-logo, #000);
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 133.333% */
    letter-spacing: -0.333px;
`;

const IndexNumber = styled.span`
    display: flex; /* 가로로 나란히 배치 */
    justify-content: center;
    align-items: center;
`;

const ItemNumber = styled.span`
    display: flex; /* 가로로 나란히 배치 */
    justify-content: center;
    align-items: center;
`;

/* //취소하기 버튼 전용 span */
const Delete = styled.span`
    margin-left: auto; /* 자동으로 왼쪽 여백을 채워 버튼을 오른쪽으로 밀어냄 */
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
`;
const OneLocker = styled.div`
    width: 250px;
    height: 42px;
    flex-shrink: 0;
    border-radius: 4px;
    background: #f7f7f7;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;
const DeleteButton = styled.button`
    width: 75px;
    height: 25px;
    background-color: pink;
    color: #333; /* 폰트 색상 설정 */
    margin-right: 14px;
`;

const Quantity = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
`;
const Spacer2 = styled.span`
    display: inline-block;
    margin: 0 15px; /* 왼쪽과 오른쪽에 각각 15px 간격 */
`;
const QuantityTest = styled.h1`
    display: flex;
    width: 135px;
    height: 43px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: var(--kakao-logo, #000);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    letter-spacing: -0.333px;
    color: var(--kakao-logo, #000);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.333px;
`;
const AddButton = styled.button`
    align-self: flex-end;
    background-color: yellowgreen;
    padding: 4px 8px;
    margin-top: 12px;
    color: white;
`;
