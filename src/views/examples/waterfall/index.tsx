import axios from "axios";
import "./styles.less";
import { Card, Image } from "antd";
import { useEffect, useState } from "react";
const imgUrls = [
  {
    id: "je",
    url: "https://cdn2.thecatapi.com/images/je.jpg",
    width: 716,
    height: 716,
  },
  {
    id: "2cc",
    url: "https://cdn2.thecatapi.com/images/2cc.jpg",
    width: 500,
    height: 375,
  },
  {
    id: "3ef",
    url: "https://cdn2.thecatapi.com/images/3ef.png",
    width: 500,
    height: 333,
  },
  {
    id: "5ck",
    url: "https://cdn2.thecatapi.com/images/5ck.jpg",
    width: 500,
    height: 388,
  },
  {
    id: "b7t",
    url: "https://cdn2.thecatapi.com/images/b7t.jpg",
    width: 500,
    height: 334,
  },
  {
    id: "bht",
    url: "https://cdn2.thecatapi.com/images/bht.jpg",
    width: 500,
    height: 333,
  },
  {
    id: "cf1",
    url: "https://cdn2.thecatapi.com/images/cf1.jpg",
    width: 505,
    height: 700,
  },
  {
    id: "dd4",
    url: "https://cdn2.thecatapi.com/images/dd4.jpg",
    width: 500,
    height: 333,
  },
  {
    id: "dvu",
    url: "https://cdn2.thecatapi.com/images/dvu.jpg",
    width: 897,
    height: 1200,
  },
  {
    id: "edl",
    url: "https://cdn2.thecatapi.com/images/edl.jpg",
    width: 500,
    height: 315,
  },
  {
    id: "34l",
    url: "https://cdn2.thecatapi.com/images/34l.jpg",
    width: 480,
    height: 320,
  },
  {
    id: "3ji",
    url: "https://cdn2.thecatapi.com/images/3ji.jpg",
    width: 500,
    height: 333,
  },
  {
    id: "73p",
    url: "https://cdn2.thecatapi.com/images/73p.jpg",
    width: 500,
    height: 375,
  },
  {
    id: "7ba",
    url: "https://cdn2.thecatapi.com/images/7ba.jpg",
    width: 720,
    height: 478,
  },
  {
    id: "7sk",
    url: "https://cdn2.thecatapi.com/images/7sk.gif",
    width: 256,
    height: 192,
  },
  {
    id: "dau",
    url: "https://cdn2.thecatapi.com/images/dau.jpg",
    width: 900,
    height: 675,
  },
  {
    id: "MTUwNDU2Mg",
    url: "https://cdn2.thecatapi.com/images/MTUwNDU2Mg.jpg",
    width: 707,
    height: 1130,
  },
  {
    id: "ab3",
    url: "https://cdn2.thecatapi.com/images/ab3.jpg",
    width: 500,
    height: 375,
  },
  {
    id: "bjg",
    url: "https://cdn2.thecatapi.com/images/bjg.jpg",
    width: 500,
    height: 332,
  },
  {
    id: "bm9",
    url: "https://cdn2.thecatapi.com/images/bm9.jpg",
    width: 640,
    height: 427,
  },
  {
    id: "e3f",
    url: "https://cdn2.thecatapi.com/images/e3f.jpg",
    width: 807,
    height: 561,
  },
  {
    id: "MTUyNjg2NA",
    url: "https://cdn2.thecatapi.com/images/MTUyNjg2NA.gif",
    width: 425,
    height: 239,
  },
  {
    id: "2ds",
    url: "https://cdn2.thecatapi.com/images/2ds.jpg",
    width: 485,
    height: 402,
  },
  {
    id: "35a",
    url: "https://cdn2.thecatapi.com/images/35a.gif",
    width: 500,
    height: 280,
  },
  {
    id: "3dl",
    url: "https://cdn2.thecatapi.com/images/3dl.jpg",
    width: 375,
    height: 500,
  },
  {
    id: "487",
    url: "https://cdn2.thecatapi.com/images/487.jpg",
    width: 500,
    height: 500,
  },
  {
    id: "4u3",
    url: "https://cdn2.thecatapi.com/images/4u3.jpg",
    width: 728,
    height: 1296,
  },
  {
    id: "533",
    url: "https://cdn2.thecatapi.com/images/533.jpg",
    width: 500,
    height: 465,
  },
  {
    id: "7sk",
    url: "https://cdn2.thecatapi.com/images/7sk.gif",
    width: 256,
    height: 192,
  },
  {
    id: "dau",
    url: "https://cdn2.thecatapi.com/images/dau.jpg",
    width: 900,
    height: 675,
  },
  {
    id: "MTUwNDU2Mg",
    url: "https://cdn2.thecatapi.com/images/MTUwNDU2Mg.jpg",
    width: 707,
    height: 1130,
  },
  {
    id: "mOUZSsI8a",
    url: "https://cdn2.thecatapi.com/images/mOUZSsI8a.jpg",
    width: 1263,
    height: 947,
  },
  {
    id: "1u",
    url: "https://cdn2.thecatapi.com/images/1u.gif",
    width: 500,
    height: 500,
  },
  {
    id: "1r1",
    url: "https://cdn2.thecatapi.com/images/1r1.jpg",
    width: 500,
    height: 335,
  },
  {
    id: "aru",
    url: "https://cdn2.thecatapi.com/images/aru.jpg",
    width: 612,
    height: 612,
  },
  {
    id: "bkr",
    url: "https://cdn2.thecatapi.com/images/bkr.jpg",
    width: 1600,
    height: 1200,
  },
  {
    id: "bpe",
    url: "https://cdn2.thecatapi.com/images/bpe.jpg",
    width: 1216,
    height: 816,
  },
  {
    id: "dlu",
    url: "https://cdn2.thecatapi.com/images/dlu.jpg",
    width: 640,
    height: 451,
  },
  {
    id: "MTYzMzQ3NQ",
    url: "https://cdn2.thecatapi.com/images/MTYzMzQ3NQ.jpg",
    width: 610,
    height: 575,
  },
  {
    id: "MjA1MDIzMg",
    url: "https://cdn2.thecatapi.com/images/MjA1MDIzMg.jpg",
    width: 500,
    height: 375,
  },
  {
    id: "wEg45kYmd",
    url: "https://cdn2.thecatapi.com/images/wEg45kYmd.jpg",
    width: 1620,
    height: 1080,
  },
  {
    id: "stVqmJmi7",
    url: "https://cdn2.thecatapi.com/images/stVqmJmi7.jpg",
    width: 1400,
    height: 1050,
  },
  {
    id: "31p",
    url: "https://cdn2.thecatapi.com/images/31p.jpg",
    width: 640,
    height: 458,
  },
  {
    id: "7pg",
    url: "https://cdn2.thecatapi.com/images/7pg.gif",
    width: 240,
    height: 169,
  },
  {
    id: "9cs",
    url: "https://cdn2.thecatapi.com/images/9cs.jpg",
    width: 533,
    height: 800,
  },
  {
    id: "ap7",
    url: "https://cdn2.thecatapi.com/images/ap7.jpg",
    width: 640,
    height: 409,
  },
  {
    id: "bl4",
    url: "https://cdn2.thecatapi.com/images/bl4.jpg",
    width: 480,
    height: 640,
  },
  {
    id: "ccg",
    url: "https://cdn2.thecatapi.com/images/ccg.jpg",
    width: 612,
    height: 612,
  },
  {
    id: "daa",
    url: "https://cdn2.thecatapi.com/images/daa.jpg",
    width: 900,
    height: 629,
  },
  {
    id: "dai",
    url: "https://cdn2.thecatapi.com/images/dai.jpg",
    width: 1280,
    height: 854,
  },
  {
    id: "dfq",
    url: "https://cdn2.thecatapi.com/images/dfq.jpg",
    width: 450,
    height: 338,
  },
  {
    id: "zKO1twSOV",
    url: "https://cdn2.thecatapi.com/images/zKO1twSOV.jpg",
    width: 1600,
    height: 1067,
  },
];
const Waterfall = () => {
  const [preview, setPreview] = useState("");
  const [isMask, setIsMask] = useState(false);
  const imgScanHandler = (e: any) => {
    console.dir(e.target.children[0]);
    setIsMask(true);
    setPreview(e.target.children[0]["currentSrc"]);
  };
  const maskHandler = () => {
    setIsMask(false);
    setPreview("");
  };
  return (
    <div className="masonry">
      <div
        className="mask"
        style={isMask ? {} : { display: "none" }}
        onClick={maskHandler}
      ></div>
      <img src={preview} style={preview?{}:{display:"none"}} className="preview" alt="" />
      {imgUrls.map((img,index) => {
        return (
          <div key={index} className="item" onClick={imgScanHandler}>
            <img src={img.url} alt="" />
            <Card className="urlCard">
              <p>{img.url}</p>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Waterfall;
