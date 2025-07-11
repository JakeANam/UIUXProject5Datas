let LpData = [
    {
        id: 0,
        title: '화서역 환승',
        parking_spot: '공영',
        address: '경기도 수원시 팔달구 화서동 644-1',

        parking_car: 174,
        parking_seat: 290,

        woman_car: 20,
        woman_seat: 20,

        abbreviation_car: 20,
        abbreviation_seat: 20, 

        electric1: 6,
        electric2: 10,
        congestion: { src: process.env.PUBLIC_URL + "/img/여유.png", name: "밀집도" },
        congestion_font: '여유'
    },

    {
        id: 1,
        title: '성대 환승(구)',
        parking_spot: '공영',
        address: '경기도 수원시 장안구 율전동 529',

        parking_car: 40,
        parking_seat: 160,

        electric1: 0,
        electric2: 2,

        woman_car: 2,
        woman_seat: 5,

        abbreviation_car: 2,
        abbreviation_seat: 10, 

        congestion: { src: process.env.PUBLIC_URL + "/img/혼잡.png", name: "밀집도" },
        congestion_font: '혼잡'
    },

    {
        id: 2,
        title: '꽃뫼 환승',
        parking_spot: '공영',
        address: '경기도 수원시 팔달구 화서동 689-1',

        parking_car: 0,
        parking_seat: 162,

        electric1: 0,
        electric2: 0,

        woman_car: 0,
        woman_seat: 10,

        abbreviation_car: 0,
        abbreviation_seat: 10, 

        congestion: { src: process.env.PUBLIC_URL + "/img/매우혼잡.png", name: "밀집도" },
        congestion_font: '매우 혼잡'
    },

    {
        id: 3,
        title: '세류역 환승',
        parking_spot: '공영',
        address: '경기도 수원시 권선구 장지동 45-1',

        parking_car: 0,
        parking_seat: 136,

        electric1: 0,
        electric2: 0,

        woman_car: 0,
        woman_seat: 10,

        abbreviation_car: 5,
        abbreviation_seat: 10, 

        congestion: { src: process.env.PUBLIC_URL + "/img/매우혼잡.png", name: "밀집도" },
        congestion_font: '매우 혼잡'
    },

    {
        id: 4,
        title: '성대 환승',
        parking_spot: '공영',
        address: '경기도 수원시 장안구 화산로 242',

        parking_car: 113,
        parking_seat: 191,

        electric1: 7,
        electric2: 10,

        woman_car: 10,
        woman_seat: 15,

        abbreviation_car: 10,
        abbreviation_seat: 10, 

        congestion: { src: process.env.PUBLIC_URL + "/img/보통.png", name: "밀집도" },
        congestion_font: '보통'
    },

    {
        id: 5,
        title: '교동 공영',
        parking_spot: '공영',
        address: '경기도 수원시 팔달구 교동 139',

        parking_car: 84,
        parking_seat: 246,

        electric1: 6,
        electric2: 6,

        woman_car: 5,
        woman_seat: 15,

        abbreviation_car: 20,
        abbreviation_seat: 20, 

        congestion: { src: process.env.PUBLIC_URL + "/img/혼잡.png", name: "밀집도" },
        congestion_font: '혼잡'
    },

];

export default LpData;